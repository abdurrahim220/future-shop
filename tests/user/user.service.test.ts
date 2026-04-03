/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "../../src/modules/user/user.services";
import UserRepository from "../../src/modules/user/user.repository";
import { userData, updateUserData, changePasswordData } from "./userTestData";
import { AuditLogService } from "../../src/modules/auditLogs/auditLog.services";
import * as nodeMailer from "../../src/services/nodeMailer";
import * as otpUtil from "../../src/utils/generateOtp";
import { UserModel } from "../../src/modules/user/user.model";
import AppError from "../../src/errors/appError";
import { HTTP_STATUS } from "../../src/errors/httpStatus";
import { AuditActor } from "../../src/interface/auditActor";

// Mock external services
jest.mock("../../src/modules/auditLogs/auditLog.services");
jest.mock("../../src/services/nodeMailer");
jest.mock("../../src/utils/generateOtp");

describe("UserService", () => {
  let userService: UserService;
  let userRepo: UserRepository;

  beforeEach(() => {
    userRepo = new UserRepository();
    userService = new UserService(userRepo);
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user and send a verification email", async () => {
      const mockOtp = "123456";
      (otpUtil.generateOtp as jest.Mock).mockReturnValue(mockOtp);
      (nodeMailer.sendMail as jest.Mock).mockResolvedValue(undefined);

      // Create a copy of user data to avoid side effects
      const testData = { ...userData[0] };
      const result = await userService.createUser(testData as any);

      expect(result).toBeDefined();
      expect(result.email).toBe(userData[0]!.email);
      expect(result.otp).toBe(Number(mockOtp));
      expect(nodeMailer.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: userData[0]!.email,
          subject: "Verify your email",
        }),
      );
    });
  });

  describe("verifyUserOtp", () => {
    it("should verify user when OTP is correct and not expired", async () => {
      const user = await UserModel.create({
        ...userData[1],
        email: "verify@test.com",
        phone: "01888888888",
        otp: 654321,
        otpExpires: new Date(Date.now() + 10000),
      });

      const result = await userService.verifyUserOtp(654321);
      expect(result.modifiedCount).toBe(1);

      const updatedUser = await UserModel.findById(user._id);
      expect(updatedUser?.isVerified).toBe(true);
      expect(updatedUser?.otp).toBeUndefined();
    });

    it("should throw error if user found but OTP somehow mismatch (edge case)", async () => {
      // Forcefully injecting user via spy to trigger the exact line: if (findUser.otp !== otp)
      jest.spyOn(userRepo, "findUserByOtp").mockResolvedValueOnce({
        _id: "fakeId",
        otp: 111111,
        otpExpires: new Date(Date.now() + 10000),
      } as any);

      await expect(userService.verifyUserOtp(222222)).rejects.toThrow(
        new AppError("Invalid OTP", HTTP_STATUS.BAD_REQUEST),
      );
    });

    it("should throw error if user not found for OTP", async () => {
      await expect(userService.verifyUserOtp(999999)).rejects.toThrow(
        new AppError("User not found", HTTP_STATUS.NOT_FOUND),
      );
    });

    it("should throw error if OTP is expired", async () => {
      await UserModel.create({
        ...userData[0],
        email: "expired@test.com",
        phone: "0999999999",
        otp: 111111,
        otpExpires: new Date(Date.now() - 10000),
      });

      await expect(userService.verifyUserOtp(111111)).rejects.toThrow(
        new AppError("OTP expired", HTTP_STATUS.BAD_REQUEST),
      );
    });
  });

  describe("getUserProfile", () => {
    it("should return user profile", async () => {
      const user = await UserModel.create({
        ...userData[0],
        email: "profile@test.com",
        phone: "07777777777",
      });
      const result = await userService.getUserProfile(user._id.toString());
      expect(result).toBeDefined();
      expect(result?.email).toBe("profile@test.com");
      expect(result?.password).toBeUndefined(); // Should exclude password
    });

    it("should throw error if id is not provided", async () => {
      expect(() => userService.getUserProfile("")).toThrow(
        new AppError("User not found!", HTTP_STATUS.NOT_FOUND),
      );
    });
  });

  describe("findUserById", () => {
    it("should throw error if id is not provided", async () => {
      await expect(userService.findUserById("")).rejects.toThrow(
        new AppError("User not found!", HTTP_STATUS.NOT_FOUND),
      );
    });
  });

  describe("updateUser", () => {
    it("should update user profile and create audit log", async () => {
      const user = await UserModel.create({
        ...userData[0],
        email: "update@test.com",
        phone: "01222222222",
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "CUSTOMER",
      };

      const result = await userService.updateUser(
        user._id.toString(),
        updateUserData as any,
        actor,
      );
      expect(result.modifiedCount).toBe(1);

      const updatedUser = await UserModel.findById(user._id);
      expect(updatedUser?.name).toBe(updateUserData.name);

      expect(AuditLogService.create).toHaveBeenCalled();
    });

    it("should throw error if user to update does not exist", async () => {
      const actor: AuditActor = {
        userId: "507f1f084783124356789abc" as any,
        performedByRole: "CUSTOMER",
      };
      await expect(
        userService.updateUser(
          "507f1f084783124356789abc",
          updateUserData as any,
          actor,
        ),
      ).rejects.toThrow(new AppError("User not found", HTTP_STATUS.NOT_FOUND));
    });

    it("should throw error if id is missing", async () => {
      const actor: AuditActor = {
        userId: "507f1f084783124356789abc" as any,
        performedByRole: "CUSTOMER",
      };
      await expect(
        userService.updateUser("", updateUserData as any, actor),
      ).rejects.toThrow(
        new AppError("Enter a valid user Id", HTTP_STATUS.NOT_FOUND),
      );
    });
  });

  describe("changeUserPassword", () => {
    it("should change password when old password matches", async () => {
      const user = await UserModel.create({
        ...userData[0],
        email: "password@test.com",
        phone: "01333333333",
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "CUSTOMER",
      };

      const result = await userService.changeUserPassword(
        user._id.toString(),
        changePasswordData.newPassword,
        userData[0]!.password,
        actor,
      );

      expect(result.modifiedCount).toBe(1);

      const updatedUser = await UserModel.findById(user._id).select(
        "+password",
      );
      const isMatch = await updatedUser?.comparePassword(
        changePasswordData.newPassword,
      );
      expect(isMatch).toBe(true);
      expect(AuditLogService.create).toHaveBeenCalled();
    });

    it("should throw error if old password is incorrect", async () => {
      const user = await UserModel.create({
        ...userData[1],
        email: "wrongpass@test.com",
        phone: "01444444444",
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "CUSTOMER",
      };

      await expect(
        userService.changeUserPassword(
          user._id.toString(),
          "newpass",
          "wrongoldpass",
          actor,
        ),
      ).rejects.toThrow(
        new AppError("Invalid password", HTTP_STATUS.BAD_REQUEST),
      );
    });
  });

  describe("softDeleteUser", () => {
    it("should throw error if userId is missing", async () => {
      const actor: AuditActor = {
        userId: "fakeId" as any,
        performedByRole: "ADMIN",
      };
      await expect(userService.softDeleteUser("", actor)).rejects.toThrow(
        new AppError("User ID is required", HTTP_STATUS.NOT_FOUND),
      );
    });

    it("should throw error if user does not exist", async () => {
      const actor: AuditActor = {
        userId: "fakeId" as any,
        performedByRole: "ADMIN",
      };
      await expect(
        userService.softDeleteUser("507f1f084783124356789abc", actor),
      ).rejects.toThrow(new AppError("User not found", HTTP_STATUS.NOT_FOUND));
    });

    it("should set isDeleted to true and create audit log", async () => {
      const user = await UserModel.create({
        ...userData[0],
        email: "delete@test.com",
        phone: "1234567890",
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "ADMIN",
      };

      const result = await userService.softDeleteUser(
        user._id.toString(),
        actor,
      );
      expect(result.modifiedCount).toBe(1);

      const deletedUser = await UserModel.findById(user._id);
      expect(deletedUser?.isDeleted).toBe(true);
      expect(AuditLogService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "SOFT_DELETE",
        }),
      );
    });

    it("should throw error if user is already deleted", async () => {
      const user = await UserModel.create({
        ...userData[1],
        email: "already@deleted.com",
        phone: "1111111111",
        isDeleted: true,
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "ADMIN",
      };

      await expect(
        userService.softDeleteUser(user._id.toString(), actor),
      ).rejects.toThrow(
        new AppError("User is already deleted", HTTP_STATUS.BAD_REQUEST),
      );
    });

    it("should throw error if repository fails to delete (returns null)", async () => {
      const user = await UserModel.create({
        ...userData[1],
        email: "delete-fail@test.com",
        phone: "19999999999",
      });
      const actor: AuditActor = {
        userId: user._id as any,
        performedByRole: "ADMIN",
      };

      jest.spyOn(userRepo, "softDeleteUser").mockResolvedValueOnce(null as any);

      await expect(
        userService.softDeleteUser(user._id.toString(), actor),
      ).rejects.toThrow(
        new AppError(
          "Failed to soft delete user",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});

import request from "supertest";
import app from "../../src/app";
import { UserModel } from "../../src/modules/user/user.model";
import { userData, updateUserData, changePasswordData } from "./userTestData";
import jwt from "jsonwebtoken";
import { config } from "../../src/config/config";

describe("User Routes Integration Tests", () => {
  let userToken: string;
  let adminToken: string;
  let userId: string;

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .send(userData[0]);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User created successfully");
    });
  });

  describe("PATCH /api/v1/users/verify-otp", () => {
    it("should verify user with correct OTP", async () => {
      const user = await UserModel.create({
        ...userData[0],
        otp: 123456,
        otpExpires: new Date(Date.now() + 10000),
      });

      const response = await request(app)
        .patch("/api/v1/users/verify-otp")
        .send({ otp: 123456 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User verified successfully");

      const updatedUser = await UserModel.findById(user._id);
      expect(updatedUser?.isVerified).toBe(true);
    });
  });

  describe("authenticated routes", () => {
    beforeEach(async () => {
      // Create a verified user for auth tests
      const user = await UserModel.create({
        ...userData[0],
        email: "auth@test.com",
        phone: "01555555555",
        isVerified: true,
      });
      userId = user._id.toString();
      userToken = jwt.sign(
        { id: userId, role: "customer", email: user.email },
        config.JWT_SECRET as string,
        { expiresIn: "1h" },
      );

      const adminUser = await UserModel.create({
        ...userData[1],
        email: "admin@test.com",
        phone: "01999999999",
        role: "admin",
        isVerified: true,
      });
      adminToken = jwt.sign(
        { id: adminUser._id.toString(), role: "admin", email: adminUser.email },
        config.JWT_SECRET as string,
        { expiresIn: "1h" },
      );
    });

    describe("GET /api/v1/users/:id", () => {
      it("should fetch user by ID", async () => {
        const response = await request(app)
          .get(`/api/v1/users/${userId}`)
          .set("Authorization", `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("auth@test.com");
      });
    });

    describe("PUT /api/v1/users", () => {
      it("should update logged in user profile", async () => {
        const response = await request(app)
          .put("/api/v1/users")
          .set("Authorization", `Bearer ${userToken}`)
          .send(updateUserData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User updated successfully");

        const updatedUser = await UserModel.findById(userId);
        expect(updatedUser?.name).toBe(updateUserData.name);
      });
    });

    describe("PATCH /api/v1/users/change-password/:id", () => {
      it("should change user password", async () => {
        const response = await request(app)
          .patch(`/api/v1/users/change-password/${userId}`)
          .set("Authorization", `Bearer ${userToken}`)
          .send(changePasswordData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe(
          "User password updated successfully",
        );
      });
    });

    describe("PATCH /api/v1/users/:id (Soft Delete)", () => {
      it("should soft delete user", async () => {
        const response = await request(app)
          .patch(`/api/v1/users/${userId}`)
          .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted successfully");

        const deletedUser = await UserModel.findById(userId);
        expect(deletedUser?.isDeleted).toBe(true);
      });
    });
  });
});

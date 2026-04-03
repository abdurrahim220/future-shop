import UserRepository from "../../src/modules/user/user.repository";
import { UserModel } from "../../src/modules/user/user.model";
import { userData } from "./userTestData";

describe("UserRepository", () => {
  let userRepo: UserRepository;
  let testUserIds: string[] = [];

  beforeAll(async () => {
    userRepo = new UserRepository();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    // Seed some users for findAllUsers testing
    const createdUsers = await UserModel.insertMany([
      {
        ...userData[0],
        email: "repo1@test.com",
        phone: "repo01",
        role: "customer",
        status: "active",
      },
      {
        ...userData[1],
        email: "repo2@test.com",
        phone: "repo02",
        role: "seller",
        status: "blocked",
      },
    ]);
    testUserIds = createdUsers.map((u) => u._id.toString());
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  describe("findAllUsers", () => {
    it("should return paginated list of users with exact structure", async () => {
      const result = await userRepo.findAllUsers({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.meta.totalPages).toBe(1);
    });

    it("should filter users by role and status", async () => {
      const result = await userRepo.findAllUsers({
        role: "seller",
        status: "blocked",
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].email).toBe("repo2@test.com");
    });
  });

  describe("changeUserRole", () => {
    it("should update user role and optionally sellerRequest", async () => {
      const result = await userRepo.changeUserRole(
        testUserIds[0]!,
        "seller",
        "approved",
      );
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser?.role).toBe("seller");
      expect(findUser?.sellerRequest).toBe("approved");
    });
  });

  describe("blockUser & unblockUser", () => {
    it("should block an active user", async () => {
      const result = await userRepo.blockUser(testUserIds[0]!);
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser?.status).toBe("blocked");
    });

    it("should unblock a blocked user", async () => {
      const result = await userRepo.unblockUser(testUserIds[1]!);
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[1]);
      expect(findUser?.status).toBe("active");
    });
  });

  describe("softDeleteUser & restoreUser", () => {
    it("should soft delete a user", async () => {
      const result = await userRepo.softDeleteUser(testUserIds[0]!);
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser?.isDeleted).toBe(true);
    });

    it("should restore a soft-deleted user", async () => {
      await userRepo.softDeleteUser(testUserIds[0]!);
      const result = await userRepo.restoreUser(testUserIds[0]!);
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser?.isDeleted).toBe(false);
    });
  });

  describe("requestForSeller", () => {
    it("should update sellerRequest status", async () => {
      const result = await userRepo.requestForSeller(
        testUserIds[0]!,
        "pending",
      );
      expect(result.modifiedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser?.sellerRequest).toBe("pending");
    });
  });

  describe("deleteUser", () => {
    it("should physically delete the user from database", async () => {
      const result = await userRepo.deleteUser(testUserIds[0]!);
      expect(result.deletedCount).toBe(1);

      const findUser = await UserModel.findById(testUserIds[0]);
      expect(findUser).toBeNull();
    });
  });
});

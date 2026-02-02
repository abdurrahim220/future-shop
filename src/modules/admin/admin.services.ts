import { Types } from "mongoose";
import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { AuditActor } from "../../interface/auditActor";
import { buildChanges } from "../auditLogs/auditLog.helper";
import { AuditLogService } from "../auditLogs/auditLog.services";
import { IUser } from "../user/user.interface";
import UserRepository from "../user/user.repository";
import { IAdminUserRole } from "./admin.interface";

class AdminService {
  constructor(private userRepo: UserRepository) {}
  async findAllUsers(query: Record<string, unknown>) {
    return this.userRepo.findAllUsers(query);
  }
  async changeUserRole(payload: IAdminUserRole, actor: AuditActor) {
    if (!payload.userId) {
      throw new AppError("User ID is required", HTTP_STATUS.NOT_FOUND);
    }
    if (!payload.role) {
      throw new AppError("Role is required", HTTP_STATUS.BAD_REQUEST);
    }
    const findUser = await this.userRepo.findUserById(payload.userId);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (findUser.role === payload.role) {
      throw new AppError("User already has this role", HTTP_STATUS.BAD_REQUEST);
    }
    const before = findUser.toObject() as IUser;
    const updateData = { ...payload };
    const result = await this.userRepo.changeUserRole(
      payload.userId,
      payload.role,
      payload?.sellerRequest,
    );
    const changes = buildChanges(before, { ...before, ...updateData });
    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "ROLE_CHANGE",
      entityType: "USER",
      entityId: new Types.ObjectId(payload.userId),
      ...(changes && { changes }),
    });
    if (!result) {
      throw new AppError(
        "Failed to change user role",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async blockUser(userId: string, actor: AuditActor) {
    if (!userId) {
      throw new AppError("User ID is required", HTTP_STATUS.NOT_FOUND);
    }
    const findUser = await this.userRepo.findUserById(userId);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (findUser.status === "blocked") {
      throw new AppError("User is already blocked", HTTP_STATUS.BAD_REQUEST);
    }
    const before = findUser.toObject() as IUser;
    const result = await this.userRepo.blockUser(userId);
    const changes = buildChanges(before, { ...before, status: "blocked" });
    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "BLOCK",
      entityType: "USER",
      entityId: new Types.ObjectId(userId),
      ...(changes && { changes }),
    });
    if (!result) {
      throw new AppError(
        "Failed to block user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async unblockUser(userId: string, actor: AuditActor) {
    if (!userId) {
      throw new AppError("User ID is required", HTTP_STATUS.NOT_FOUND);
    }
    const findUser = await this.userRepo.findUserById(userId);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (findUser.status === "active") {
      throw new AppError("User is already active", HTTP_STATUS.BAD_REQUEST);
    }
    const before = findUser.toObject() as IUser;
    const result = await this.userRepo.unblockUser(userId);
    const changes = buildChanges(before, { ...before, status: "active" });
    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "UNBLOCK",
      entityType: "USER",
      entityId: new Types.ObjectId(userId),
      ...(changes && { changes }),
    });
    if (!result) {
      throw new AppError(
        "Failed to unblock user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async restoreUser(userId: string, actor: AuditActor) {
    if (!userId) {
      throw new AppError("User ID is required", HTTP_STATUS.NOT_FOUND);
    }
    const findUser = await this.userRepo.findUserById(userId);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (!findUser.isDeleted) {
      throw new AppError("User is not deleted", HTTP_STATUS.BAD_REQUEST);
    }
    const before = findUser.toObject() as IUser;
    const result = await this.userRepo.restoreUser(userId);
    const changes = buildChanges(before, { ...before, isDeleted: false });
    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "RESTORE",
      entityType: "USER",
      entityId: new Types.ObjectId(userId),
      ...(changes && { changes }),
    });
    if (!result) {
      throw new AppError(
        "Failed to restore user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async deleteUser(userId: string, actor: AuditActor) {
    if (!userId) {
      throw new AppError("User ID is required", HTTP_STATUS.NOT_FOUND);
    }
    const findUser = await this.userRepo.findUserById(userId);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    const before = findUser.toObject() as IUser;
    const result = await this.userRepo.deleteUser(userId);
    const changes = buildChanges(before, { ...before, isDeleted: true });
    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "DELETE",
      entityType: "USER",
      entityId: new Types.ObjectId(userId),
      ...(changes && { changes }),
    });
    if (!result) {
      throw new AppError(
        "Failed to delete user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }
}

export default AdminService;

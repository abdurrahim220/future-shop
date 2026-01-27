import { Types } from "mongoose";
import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { AuditActor } from "../../interface/auditActor";
import { sendMail } from "../../services/nodeMailer";
import { otpEmailTemplate } from "../../templates/sendOtpToEmail";
import { generateOtp } from "../../utils/generateOtp";
import { buildChanges } from "../auditLogs/auditLog.helper";
import { AuditLogService } from "../auditLogs/auditLog.services";
import { IUser } from "./user.interface";
import UserRepository from "./user.repository";
import bcrypt from "bcryptjs";

class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(data: IUser) {
    const otp = generateOtp();
    data.otp = Number(otp);
    data.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    sendMail({
      to: data.email,
      subject: "Verify your email",
      html: otpEmailTemplate({ otp, expiresInMinutes: 10 }),
    });
    return this.userRepo.createUser(data);
  }

  async verifyUserOtp(otp: number) {
    console.log(otp);
    const findUser = await this.userRepo.findUserByOtp(otp);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (findUser.otp !== otp) {
      throw new AppError("Invalid OTP", HTTP_STATUS.BAD_REQUEST);
    }
    if (findUser.otpExpires && findUser.otpExpires < new Date()) {
      throw new AppError("OTP expired", HTTP_STATUS.BAD_REQUEST);
    }
    return this.userRepo.verifyUserOtp(findUser._id);
  }

  async findAllUsers(query: Record<string, unknown>) {
    return this.userRepo.findAllUsers(query);
  }

  async findUserById(id: string) {
    if (!id) {
      throw new AppError("User not found!", HTTP_STATUS.NOT_FOUND);
    }
    return this.userRepo.findUserById(id);
  }

  async updateUser(id: string, data: IUser, actor: AuditActor) {
    if (!id) {
      throw new AppError("Enter a valid user Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingUser = await this.userRepo.findUserById(id);
    if (!existingUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const before = existingUser.toObject() as IUser;
    const updateData = { ...data };

    const updateUser = await this.userRepo.updateUser(id, updateData);

    const changes = buildChanges(before, {
      ...before,
      ...updateData,
    });

    await AuditLogService.create({
      ...(actor.userId && { userId: actor.userId }),
      performedByRole: actor.performedByRole,
      action: "UPDATE",
      entityType: "USER",
      entityId: new Types.ObjectId(id),
      ...(changes && { changes }),
    });
    return updateUser;
  }

  async changeUserPassword(
    id: string,
    newPassword: string,
    oldPassword: string,
  ) {
    const findUser = await this.userRepo.findUserById(id);
    if (!findUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const isPasswordMatched = await findUser.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      throw new AppError("Invalid password", HTTP_STATUS.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userRepo.changeUserPassword(id, hashedPassword);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}

export default UserService;

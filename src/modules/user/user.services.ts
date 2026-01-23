import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { sendMail } from "../../services/nodeMailer";
import { otpEmailTemplate } from "../../templates/sendOtpToEmail";
import { generateOtp } from "../../utils/generateOtp";
import { IUser } from "./user.interface";
import UserRepository from "./user.repository";

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

  async findAllUsers() {
    return this.userRepo.findAllUsers();
  }

  async findUserById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid user Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.userRepo.findUserById(id);
  }

  async updateUser(id: string, data: IUser) {
    if (!id) {
      throw new AppError("Enter a valid user Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}

export default UserService;

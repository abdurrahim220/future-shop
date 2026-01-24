import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

class UserRepository {
  findAllUsers() {
    return UserModel.find();
  }

  createUser(data: IUser) {
    return UserModel.create(data);
  }

  findUserByOtp(otp: number) {
    return UserModel.findOne({ otp });
  }

  verifyUserOtp(userId: Types.ObjectId) {
    return UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          otp: " ",
          otpExpires: " ",
        },
      },
    );
  }

  findUserById(id: string) {
    return UserModel.findById(id);
  }

  updateUser(id: string, data: IUser) {
    return UserModel.updateOne({ _id: id }, data);
  }
  changeUserPassword(userId: string, newPassword: string) {
    return UserModel.updateOne(
      { _id: userId },
      {
        password: newPassword,
        passwordChangedAt: new Date(),
      },
    );
  }

  deleteUser(id: string) {
    return UserModel.deleteOne({ _id: id });
  }
}

export default UserRepository;

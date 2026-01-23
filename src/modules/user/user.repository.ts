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

  verifyUserOtp(userId: string) {
    return UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          otp: undefined,
          otpExpires: undefined,
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

  deleteUser(id: string) {
    return UserModel.deleteOne({ _id: id });
  }
}

export default UserRepository;

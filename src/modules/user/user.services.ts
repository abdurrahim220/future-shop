import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IUser } from "./user.interface";
import UserRepository from "./user.repository";

class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(data: IUser) {
    return this.userRepo.createUser(data);
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

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
    return this.userRepo.findUserById(id);
  }

  async updateUser(id: string, data: IUser) {
    return this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}

export default UserService;

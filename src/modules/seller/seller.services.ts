import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { UserModel } from "../user/user.model";
import { ISeller } from "./seller.interface";
import SellerRepository from "./seller.repository";

class SellerService {
  constructor(private sellerRepo: SellerRepository) {}

  async requestForSeller(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (user.role !== "customer") {
      throw new AppError("User is not a customer", HTTP_STATUS.BAD_REQUEST);
    }
    if (user.sellerRequest === "approved") {
      throw new AppError("User is already a seller", HTTP_STATUS.BAD_REQUEST);
    }
    if (user.sellerRequest === "pending") {
      throw new AppError(
        "User is already requested for seller",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (user.sellerRequest === "rejected") {
      throw new AppError(
        "User is rejected for seller",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    return UserModel.updateOne(
      { _id: userId },
      { $set: { sellerRequest: "pending" } },
    );
  }

  async createSeller(data: ISeller) {
    return this.sellerRepo.createSeller(data);
  }

  async findAllSellers() {
    return this.sellerRepo.findAllSellers();
  }

  async findSellerById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.sellerRepo.findSellerById(id);
  }

  async updateSeller(id: string, data: Partial<ISeller>) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.sellerRepo.updateSeller(id, data);
  }

  async deleteSeller(id: string) {
    return this.sellerRepo.deleteSeller(id);
  }
}

export default SellerService;

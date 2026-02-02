import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ISellerWallet } from "./sellerwallet.interface";
import SellerWalletRepository from "./sellerwallet.repository";

class SellerWalletService {
  constructor(private sellerwalletRepo: SellerWalletRepository) {}

  async createSellerWallet(data: ISellerWallet) {
    return this.sellerwalletRepo.createSellerWallet(data);
  }

  async findAllSellerWallets() {
    return this.sellerwalletRepo.findAllSellerWallets();
  }

  async findSellerWalletById(id: string) {
    if (!id) {
      throw new AppError(
        "Enter a valid sellerwallet Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.sellerwalletRepo.findSellerWalletById(id);
  }

  async updateSellerWallet(id: string, data: Partial<ISellerWallet>) {
    if (!id) {
      throw new AppError(
        "Enter a valid sellerwallet Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.sellerwalletRepo.updateSellerWallet(id, data);
  }

  async deleteSellerWallet(id: string) {
    return this.sellerwalletRepo.deleteSellerWallet(id);
  }
}

export default SellerWalletService;

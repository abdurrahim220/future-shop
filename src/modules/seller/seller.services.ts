import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ISeller } from "./seller.interface";
import SellerRepository from "./seller.repository";

class SellerService {
  constructor(private sellerRepo: SellerRepository) {}

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

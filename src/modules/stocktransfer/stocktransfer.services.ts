import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IStockTransfer } from "./stocktransfer.interface";
import StockTransferRepository from "./stocktransfer.repository";

class StockTransferService {
  constructor(private stocktransferRepo: StockTransferRepository) {}

  async createStockTransfer(data: IStockTransfer) {
    return this.stocktransferRepo.createStockTransfer(data);
  }

  async findAllStockTransfers() {
    return this.stocktransferRepo.findAllStockTransfers();
  }

  async findStockTransferById(id: string) {
    if (!id) {
      throw new AppError(
        "Enter a valid stocktransfer Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.stocktransferRepo.findStockTransferById(id);
  }

  async updateStockTransfer(id: string, data: Partial<IStockTransfer>) {
    if (!id) {
      throw new AppError(
        "Enter a valid stocktransfer Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.stocktransferRepo.updateStockTransfer(id, data);
  }

  async deleteStockTransfer(id: string) {
    return this.stocktransferRepo.deleteStockTransfer(id);
  }
}

export default StockTransferService;

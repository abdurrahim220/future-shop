import { IStockTransfer } from "./stocktransfer.interface";
import { StockTransferModel } from "./stocktransfer.model";

class StockTransferRepository {
  async findAllStockTransfers() {
    return StockTransferModel.find();
  }

  async createStockTransfer(data: IStockTransfer) {
    return StockTransferModel.create(data);
  }

  async findStockTransferById(id: string) {
    return StockTransferModel.findById(id);
  }

  async updateStockTransfer(id: string, data: Partial<IStockTransfer>) {
    return StockTransferModel.updateOne({ _id: id }, data);
  }

  async deleteStockTransfer(id: string) {
    return StockTransferModel.deleteOne({ _id: id });
  }
}

export default StockTransferRepository;

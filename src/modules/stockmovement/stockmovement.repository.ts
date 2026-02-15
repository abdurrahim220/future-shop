import { IStockMovement } from "./stockmovement.interface";
import { StockMovementModel } from "./stockmovement.model";

class StockMovementRepository {
  async findAllStockMovements() {
    return StockMovementModel.find();
  }

  async createStockMovement(data: IStockMovement) {
    return StockMovementModel.create(data);
  }

  async findStockMovementById(id: string) {
    return StockMovementModel.findById(id);
  }

  async updateStockMovement(id: string, data: Partial<IStockMovement>) {
    return StockMovementModel.updateOne({ _id: id }, data);
  }

  async deleteStockMovement(id: string) {
    return StockMovementModel.deleteOne({ _id: id });
  }
}

export default StockMovementRepository;

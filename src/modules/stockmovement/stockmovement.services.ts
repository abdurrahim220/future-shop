import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IStockMovement } from "./stockmovement.interface";
import StockMovementRepository from "./stockmovement.repository";

class StockMovementService {
  constructor(private stockmovementRepo: StockMovementRepository) {}

  async createStockMovement(data: IStockMovement) {
    return this.stockmovementRepo.createStockMovement(data);
  }

  async findAllStockMovements() {
    return this.stockmovementRepo.findAllStockMovements();
  }

  async findStockMovementById(id: string) {
    if (!id) {
      throw new AppError(
        "Enter a valid stockmovement Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.stockmovementRepo.findStockMovementById(id);
  }

  async updateStockMovement(id: string, data: Partial<IStockMovement>) {
    if (!id) {
      throw new AppError(
        "Enter a valid stockmovement Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.stockmovementRepo.updateStockMovement(id, data);
  }

  async deleteStockMovement(id: string) {
    return this.stockmovementRepo.deleteStockMovement(id);
  }
}

export default StockMovementService;

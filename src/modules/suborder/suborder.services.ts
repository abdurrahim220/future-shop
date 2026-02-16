import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ISubOrder } from "./suborder.interface";
import SubOrderRepository from "./suborder.repository";

class SubOrderService {
  constructor(private suborderRepo: SubOrderRepository) {}

  async createSubOrder(data: ISubOrder) {
    return this.suborderRepo.createSubOrder(data);
  }

  async findAllSubOrders() {
    return this.suborderRepo.findAllSubOrders();
  }

  async findSubOrderById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid suborder Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.suborderRepo.findSubOrderById(id);
  }

  async updateSubOrder(id: string, data: Partial<ISubOrder>) {
    if (!id) {
      throw new AppError("Enter a valid suborder Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.suborderRepo.updateSubOrder(id, data);
  }

  async deleteSubOrder(id: string) {
    return this.suborderRepo.deleteSubOrder(id);
  }
}

export default SubOrderService;

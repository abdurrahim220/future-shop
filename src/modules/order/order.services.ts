import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IOrder } from "./order.interface";
import OrderRepository from "./order.repository";

class OrderService {
  constructor(private orderRepo: OrderRepository) {}

  async createOrder(data: IOrder) {
    return this.orderRepo.createOrder(data);
  }

  async findAllOrders() {
    return this.orderRepo.findAllOrders();
  }

  async findOrderById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid order Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.orderRepo.findOrderById(id);
  }

  async updateOrder(id: string, data: Partial<IOrder>) {
    if (!id) {
      throw new AppError("Enter a valid order Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.orderRepo.updateOrder(id, data);
  }

  async deleteOrder(id: string) {
    return this.orderRepo.deleteOrder(id);
  }
}

export default OrderService;

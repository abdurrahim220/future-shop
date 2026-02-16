import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

class OrderRepository {
  async findAllOrders() {
    return OrderModel.find();
  }

  async createOrder(data: IOrder) {
    return OrderModel.create(data);
  }

  async findOrderById(id: string) {
    return OrderModel.findById(id);
  }

  async updateOrder(id: string, data: Partial<IOrder>) {
    return OrderModel.updateOne({ _id: id }, data);
  }

  async deleteOrder(id: string) {
    return OrderModel.deleteOne({ _id: id });
  }
}

export default OrderRepository;

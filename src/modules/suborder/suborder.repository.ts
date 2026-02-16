import { ISubOrder } from "./suborder.interface";
import { SubOrderModel } from "./suborder.model";

class SubOrderRepository {
  async findAllSubOrders() {
    return SubOrderModel.find();
  }

  async createSubOrder(data: ISubOrder) {
    return SubOrderModel.create(data);
  }

  async findSubOrderById(id: string) {
    return SubOrderModel.findById(id);
  }

  async updateSubOrder(id: string, data: Partial<ISubOrder>) {
    return SubOrderModel.updateOne({ _id: id }, data);
  }

  async deleteSubOrder(id: string) {
    return SubOrderModel.deleteOne({ _id: id });
  }
}

export default SubOrderRepository;

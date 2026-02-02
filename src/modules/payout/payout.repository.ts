import { IPayout } from "./payout.interface";
import { PayoutModel } from "./payout.model";

class PayoutRepository {
  async findAllPayouts() {
    return PayoutModel.find();
  }

  async createPayout(data: IPayout) {
    return PayoutModel.create(data);
  }

  async findPayoutById(id: string) {
    return PayoutModel.findById(id);
  }

  async updatePayout(id: string, data: Partial<IPayout>) {
    return PayoutModel.updateOne({ _id: id }, data);
  }

  async deletePayout(id: string) {
    return PayoutModel.deleteOne({ _id: id });
  }
}

export default PayoutRepository;

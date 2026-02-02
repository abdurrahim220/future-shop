import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IPayout } from "./payout.interface";
import PayoutRepository from "./payout.repository";

class PayoutService {
  constructor(private payoutRepo: PayoutRepository) {}

  async createPayout(data: IPayout) {
    return this.payoutRepo.createPayout(data);
  }

  async findAllPayouts() {
    return this.payoutRepo.findAllPayouts();
  }

  async findPayoutById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid payout Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.payoutRepo.findPayoutById(id);
  }

  async updatePayout(id: string, data: Partial<IPayout>) {
    if (!id) {
      throw new AppError("Enter a valid payout Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.payoutRepo.updatePayout(id, data);
  }

  async deletePayout(id: string) {
    return this.payoutRepo.deletePayout(id);
  }
}

export default PayoutService;

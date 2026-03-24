import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ICupons } from "./cupons.interface";
import CuponsRepository from "./cupons.repository";

class CuponsService {
  constructor(private cuponsRepo: CuponsRepository) {}

  async createCupons(data: ICupons) {
    return this.cuponsRepo.createCupons(data);
  }

  async findAllCuponss(query: Record<string, unknown>) {
    return this.cuponsRepo.findAllCuponss(query);
  }

  async findCuponsById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid cupons Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.cuponsRepo.findCuponsById(id);
  }

  async updateCupons(id: string, data: Partial<ICupons>) {
    if (!id) {
      throw new AppError("Enter a valid cupons Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.cuponsRepo.updateCupons(id, data);
  }

  async deleteCupons(id: string) {
    return this.cuponsRepo.deleteCupons(id);
  }
}

export default CuponsService;

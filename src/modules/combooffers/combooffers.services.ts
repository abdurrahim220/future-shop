import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IComboOffers } from "./combooffers.interface";
import ComboOffersRepository from "./combooffers.repository";

class ComboOffersService {
  constructor(private combooffersRepo: ComboOffersRepository) {}

  async createComboOffers(data: IComboOffers) {
    return this.combooffersRepo.createComboOffers(data);
  }

  async findAllComboOfferss() {
    return this.combooffersRepo.findAllComboOfferss();
  }

  async findComboOffersById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid combooffers Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.combooffersRepo.findComboOffersById(id);
  }

  async updateComboOffers(id: string, data: Partial<IComboOffers>) {
    if (!id) {
      throw new AppError("Enter a valid combooffers Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.combooffersRepo.updateComboOffers(id, data);
  }

  async deleteComboOffers(id: string) {
    return this.combooffersRepo.deleteComboOffers(id);
  }
}

export default ComboOffersService;
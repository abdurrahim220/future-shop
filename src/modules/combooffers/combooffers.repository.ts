import { IComboOffers } from "./combooffers.interface";
import { ComboOffersModel } from "./combooffers.model";

class ComboOffersRepository {
  async findAllComboOfferss() {
    return ComboOffersModel.find();
  }

  async createComboOffers(data: IComboOffers) {
    return ComboOffersModel.create(data);
  }

  async findComboOffersById(id: string) {
    return ComboOffersModel.findById(id);
  }

  async updateComboOffers(id: string, data: Partial<IComboOffers>) {
    return ComboOffersModel.updateOne({ _id: id }, data);
  }

  async deleteComboOffers(id: string) {
    return ComboOffersModel.deleteOne({ _id: id });
  }
}

export default ComboOffersRepository;
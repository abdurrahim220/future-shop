import { ISeller } from "./seller.interface";
import { SellerModel } from "./seller.model";

class SellerRepository {
  async findAllSellers() {
    return SellerModel.find();
  }

  async createSeller(data: ISeller) {
    return SellerModel.create(data);
  }

  async findSellerById(id: string) {
    return SellerModel.findById(id);
  }

  async updateSeller(id: string, data: Partial<ISeller>) {
    return SellerModel.updateOne({ _id: id }, data);
  }

  async deleteSeller(id: string) {
    return SellerModel.deleteOne({ _id: id });
  }
}

export default SellerRepository;

import { SellerRequestStatus } from "../../interface/allstatus";
import { ISeller } from "./seller.interface";
import { SellerModel } from "./seller.model";

class SellerRepository {
  async findAllSellers(query: Record<string, unknown>) {
    return SellerModel.find(query);
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

  async updateSellerRequest(id: string, status: SellerRequestStatus) {
    // console.log(id, status);
    return SellerModel.updateOne({ _id: id }, { status: status });
  }

  async deleteSeller(id: string) {
    return SellerModel.deleteOne({ _id: id });
  }
}

export default SellerRepository;

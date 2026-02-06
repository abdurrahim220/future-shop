import { IBrands } from "./brands.interface";
import { BrandsModel } from "./brands.model";

class BrandsRepository {
  async findAllBrandss() {
    return BrandsModel.find();
  }

  async createBrands(data: IBrands) {
    return BrandsModel.create(data);
  }

  async findBrandsById(id: string) {
    return BrandsModel.findById(id);
  }

  async updateBrands(id: string, data: Partial<IBrands>) {
    return BrandsModel.updateOne({ _id: id }, data);
  }

  async deleteBrands(id: string) {
    return BrandsModel.deleteOne({ _id: id });
  }
}

export default BrandsRepository;

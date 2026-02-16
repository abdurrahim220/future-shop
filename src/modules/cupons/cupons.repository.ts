import { ICupons } from "./cupons.interface";
import { CuponsModel } from "./cupons.model";

class CuponsRepository {
  async findAllCuponss() {
    return CuponsModel.find();
  }

  async createCupons(data: ICupons) {
    return CuponsModel.create(data);
  }

  async findCuponsById(id: string) {
    return CuponsModel.findById(id);
  }

  async updateCupons(id: string, data: Partial<ICupons>) {
    return CuponsModel.updateOne({ _id: id }, data);
  }

  async deleteCupons(id: string) {
    return CuponsModel.deleteOne({ _id: id });
  }
}

export default CuponsRepository;
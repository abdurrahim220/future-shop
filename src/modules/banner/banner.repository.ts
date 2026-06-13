import { IBanner } from "./banner.interface";
import { BannerModel } from "./banner.model";

class BannerRepository {
  async findAllBanners() {
    return BannerModel.find();
  }

  async createBanner(data: IBanner) {
    return BannerModel.create(data);
  }

  async findBannerById(id: string) {
    return BannerModel.findById(id);
  }

  async updateBanner(id: string, data: Partial<IBanner>) {
    return BannerModel.updateOne({ _id: id }, data);
  }

  async deleteBanner(id: string) {
    return BannerModel.deleteOne({ _id: id });
  }
}

export default BannerRepository;
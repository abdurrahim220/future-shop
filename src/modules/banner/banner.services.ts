import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/ cloudinaryHelper";
import { IBanner } from "./banner.interface";
import BannerRepository from "./banner.repository";

class BannerService {
  constructor(private bannerRepo: BannerRepository) {}

  async createBanner(payload: IBanner, buffer: Buffer) {
    const { images, public_id } = await uploadToCloudinary(buffer, "Banners");
    payload.image = images;
    payload.public_id = public_id;
    return this.bannerRepo.createBanner(payload);
  }

  async findAllBanners() {
    return this.bannerRepo.findAllBanners();
  }

  async findBannerById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid banner Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.bannerRepo.findBannerById(id);
  }

  async updateBanner(id: string, data: Partial<IBanner>, buffer?: Buffer) {
    if (!id) {
      throw new AppError("Enter a valid banner Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingBanner = await this.bannerRepo.findBannerById(id);
    if (!existingBanner) {
      throw new AppError("Banner not found", HTTP_STATUS.NOT_FOUND);
    }

    if (buffer) {
      if (existingBanner.public_id) {
        await deleteFromCloudinary(existingBanner.public_id);
      }
      const { images, public_id } = await uploadToCloudinary(buffer, "Banners");
      data.image = images;
      data.public_id = public_id;
    }

    return this.bannerRepo.updateBanner(id, data);
  }

  async deleteBanner(id: string) {
    if (!id) {
      throw new AppError("Enter a valid banner Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingBanner = await this.bannerRepo.findBannerById(id);
    if (!existingBanner) {
      throw new AppError("Banner not found", HTTP_STATUS.NOT_FOUND);
    }
    if (existingBanner.public_id) {
      await deleteFromCloudinary(existingBanner.public_id);
    }
    return this.bannerRepo.deleteBanner(id);
  }
}

export default BannerService;
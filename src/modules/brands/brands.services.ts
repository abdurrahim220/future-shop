import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { uploadToCloudinary } from "../../utils/ cloudinaryHelper";
import { IBrands } from "./brands.interface";
import BrandsRepository from "./brands.repository";

class BrandsService {
  constructor(private brandsRepo: BrandsRepository) {}

  async createBrands(payload: IBrands, buffer: Buffer) {
    const { logo } = payload;
    if (!logo) {
      throw new AppError("Logo is required", HTTP_STATUS.BAD_REQUEST);
    }

    const { images, public_id } = await uploadToCloudinary(buffer, "Brands");
    payload.logo = images;
    payload.public_id = public_id;
    return this.brandsRepo.createBrands(payload);
  }

  async findAllBrandss() {
    return this.brandsRepo.findAllBrandss();
  }

  async findBrandsById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid brands Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.brandsRepo.findBrandsById(id);
  }

  async updateBrands(id: string, data: Partial<IBrands>) {
    if (!id) {
      throw new AppError("Enter a valid brands Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.brandsRepo.updateBrands(id, data);
  }

  async deleteBrands(id: string) {
    return this.brandsRepo.deleteBrands(id);
  }
}

export default BrandsService;

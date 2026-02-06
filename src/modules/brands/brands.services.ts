import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { uploadToCloudinary } from "../../utils/ cloudinaryHelper";
import { IBrands } from "./brands.interface";
import BrandsRepository from "./brands.repository";

class BrandsService {
  constructor(private brandsRepo: BrandsRepository) {}

  async createBrands(payload: IBrands, buffer: Buffer) {
    const { images, public_id } = await uploadToCloudinary(buffer, "Brands");
    payload.logo = images;
    payload.public_id = public_id;
    return this.brandsRepo.createBrands(payload);
  }

  async findAllBrands(query: Record<string, unknown>) {
    return this.brandsRepo.findAllBrands(query);
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

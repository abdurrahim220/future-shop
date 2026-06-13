import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/ cloudinaryHelper";
import generateSlug from "../../utils/generateSlug";
import { IBrands } from "./brands.interface";
import BrandsRepository from "./brands.repository";
import { ProductModel } from "../product/product.model";

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

  async updateBrands(id: string, data: Partial<IBrands>, buffer?: Buffer) {
    if (!id) {
      throw new AppError("Enter a valid brands Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingBrand = await this.brandsRepo.findBrandsById(id);
    if (!existingBrand) {
      throw new AppError("Brand not found", HTTP_STATUS.NOT_FOUND);
    }

    if (buffer) {
      if (existingBrand.public_id) {
        await deleteFromCloudinary(existingBrand.public_id);
      }
      const { images, public_id } = await uploadToCloudinary(buffer, "Brands");
      data.logo = images;
      data.public_id = public_id;
    }

    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    return this.brandsRepo.updateBrands(id, data);
  }

  async deleteBrands(id: string) {
    if (!id) {
      throw new AppError("Enter a valid brands Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingBrand = await this.brandsRepo.findBrandsById(id);
    if (!existingBrand) {
      throw new AppError("Brand not found", HTTP_STATUS.NOT_FOUND);
    }

    // Check if brand is linked to any active product
    const isLinkedToActiveProduct = await ProductModel.findOne({
      brandId: id,
      status: "active",
    });
    if (isLinkedToActiveProduct) {
      throw new AppError(
        "Cannot delete brand because it is linked to one or more active products.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    if (existingBrand.public_id) {
      await deleteFromCloudinary(existingBrand.public_id);
    }
    return this.brandsRepo.deleteBrands(id);
  }
}

export default BrandsService;

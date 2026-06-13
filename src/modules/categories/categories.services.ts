import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/ cloudinaryHelper";
import generateSlug from "../../utils/generateSlug";
import { ICategories } from "./categories.interface";
import CategoriesRepository from "./categories.repository";
import { ProductModel } from "../product/product.model";

class CategoriesService {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async createCategories(data: ICategories, buffer: Buffer) {
    const { images, public_id } = await uploadToCloudinary(
      buffer,
      "Categories",
    );
    data.icon = images;
    data.public_id = public_id;
    return this.categoriesRepo.createCategories(data);
  }

  async findAllCategoriess(query: Record<string, unknown>) {
    return this.categoriesRepo.findAllCategoriess(query);
  }

  async findCategoriesById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid categories Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.categoriesRepo.findCategoriesById(id);
  }

  async updateCategories(
    id: string,
    data: Partial<ICategories>,
    buffer?: Buffer,
  ) {
    if (!id) {
      throw new AppError("Enter a valid categories Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingCategory = await this.categoriesRepo.findCategoriesById(id);
    if (!existingCategory) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }
    if (buffer) {
      if (existingCategory.public_id) {
        await deleteFromCloudinary(existingCategory.public_id);
      }
      const { images, public_id } = await uploadToCloudinary(
        buffer,
        "Categories",
      );
      data.icon = images;
      data.public_id = public_id;
    }
    if (data.name) {
      data.slug = generateSlug(data.name);
    }
    return this.categoriesRepo.updateCategories(id, data);
  }

  async deleteCategories(id: string) {
    if (!id) {
      throw new AppError("Enter a valid categories Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingCategory = await this.categoriesRepo.findCategoriesById(id);
    if (!existingCategory) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    // Check if category is linked to any active product
    const isLinkedToActiveProduct = await ProductModel.findOne({
      categoryId: id,
      status: "active",
    });
    if (isLinkedToActiveProduct) {
      throw new AppError(
        "Cannot delete category because it is linked to one or more active products.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    if (existingCategory.public_id) {
      await deleteFromCloudinary(existingCategory.public_id);
    }
    return this.categoriesRepo.deleteCategories(id);
  }
}

export default CategoriesService;

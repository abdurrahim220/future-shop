import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IAttribute } from "./attribute.interface";
import AttributeRepository from "./attribute.repository";
import { ProductModel } from "../product/product.model";

class AttributeService {
  constructor(private attributeRepo: AttributeRepository) {}

  async createAttribute(data: IAttribute) {
    return this.attributeRepo.createAttribute(data);
  }

  async findAllAttributes() {
    return this.attributeRepo.findAllAttributes();
  }

  async findAttributeById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid attribute Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.attributeRepo.findAttributeById(id);
  }

  async updateAttribute(id: string, data: Partial<IAttribute>) {
    if (!id) {
      throw new AppError("Enter a valid attribute Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.attributeRepo.updateAttribute(id, data);
  }

  async deleteAttribute(id: string) {
    if (!id) {
      throw new AppError("Enter a valid attribute Id", HTTP_STATUS.NOT_FOUND);
    }
    const existingAttribute = await this.attributeRepo.findAttributeById(id);
    if (!existingAttribute) {
      throw new AppError("Attribute not found", HTTP_STATUS.NOT_FOUND);
    }

    // Check if attribute is linked to any active product
    const isLinkedToActiveProduct = await ProductModel.findOne({
      attributeIds: id,
      status: "active",
    });
    if (isLinkedToActiveProduct) {
      throw new AppError(
        "Cannot delete attribute because it is linked to one or more active products.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    return this.attributeRepo.deleteAttribute(id);
  }
}

export default AttributeService;

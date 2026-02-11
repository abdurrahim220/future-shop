import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IAttribute } from "./attribute.interface";
import AttributeRepository from "./attribute.repository";

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
    return this.attributeRepo.deleteAttribute(id);
  }
}

export default AttributeService;

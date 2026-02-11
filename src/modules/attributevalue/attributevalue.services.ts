import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IAttributeValue } from "./attributevalue.interface";
import AttributeValueRepository from "./attributevalue.repository";

class AttributeValueService {
  constructor(private attributevalueRepo: AttributeValueRepository) {}

  async createAttributeValue(data: IAttributeValue) {
    return this.attributevalueRepo.createAttributeValue(data);
  }

  async findAllAttributeValues() {
    return this.attributevalueRepo.findAllAttributeValues();
  }

  async findAttributeValueById(id: string) {
    if (!id) {
      throw new AppError(
        "Enter a valid attributevalue Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.attributevalueRepo.findAttributeValueById(id);
  }

  async updateAttributeValue(id: string, data: Partial<IAttributeValue>) {
    if (!id) {
      throw new AppError(
        "Enter a valid attributevalue Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.attributevalueRepo.updateAttributeValue(id, data);
  }

  async deleteAttributeValue(id: string) {
    return this.attributevalueRepo.deleteAttributeValue(id);
  }
}

export default AttributeValueService;

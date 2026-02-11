import { IAttributeValue } from "./attributevalue.interface";
import { AttributeValueModel } from "./attributevalue.model";

class AttributeValueRepository {
  async findAllAttributeValues() {
    return AttributeValueModel.find();
  }

  async createAttributeValue(data: IAttributeValue) {
    return AttributeValueModel.create(data);
  }

  async findAttributeValueById(id: string) {
    return AttributeValueModel.findById(id);
  }

  async updateAttributeValue(id: string, data: Partial<IAttributeValue>) {
    return AttributeValueModel.updateOne({ _id: id }, data);
  }

  async deleteAttributeValue(id: string) {
    return AttributeValueModel.deleteOne({ _id: id });
  }
}

export default AttributeValueRepository;

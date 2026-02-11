import { IAttribute } from "./attribute.interface";
import { AttributeModel } from "./attribute.model";

class AttributeRepository {
  async findAllAttributes() {
    return AttributeModel.find();
  }

  async createAttribute(data: IAttribute) {
    return AttributeModel.create(data);
  }

  async findAttributeById(id: string) {
    return AttributeModel.findById(id);
  }

  async updateAttribute(id: string, data: Partial<IAttribute>) {
    return AttributeModel.updateOne({ _id: id }, data);
  }

  async deleteAttribute(id: string) {
    return AttributeModel.deleteOne({ _id: id });
  }
}

export default AttributeRepository;

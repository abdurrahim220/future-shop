import { IAddress } from "./address.interface";
import { AddressModel } from "./address.model";

class AddressRepository {
  async findAllAddresss() {
    return AddressModel.find();
  }

  async createAddress(data: IAddress) {
    return AddressModel.create(data);
  }

  async findAddressById(id: string) {
    return AddressModel.findById(id);
  }

  async updateAddress(id: string, data: Partial<IAddress>) {
    return AddressModel.updateOne({ _id: id }, data);
  }

  async deleteAddress(id: string) {
    return AddressModel.deleteOne({ _id: id });
  }
}

export default AddressRepository;

import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IAddress } from "./address.interface";
import AddressRepository from "./address.repository";

class AddressService {
  constructor(private addressRepo: AddressRepository) {}

  async createAddress(data: IAddress) {
    return this.addressRepo.createAddress(data);
  }

  async findAllAddresss() {
    return this.addressRepo.findAllAddresss();
  }

  async findAddressById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid address Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.addressRepo.findAddressById(id);
  }

  async updateAddress(id: string, data: Partial<IAddress>) {
    if (!id) {
      throw new AppError("Enter a valid address Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.addressRepo.updateAddress(id, data);
  }

  async deleteAddress(id: string) {
    return this.addressRepo.deleteAddress(id);
  }
}

export default AddressService;

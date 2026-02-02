import { ISellerWallet } from "./sellerwallet.interface";
import { SellerWalletModel } from "./sellerwallet.model";

class SellerWalletRepository {
  async findAllSellerWallets() {
    return SellerWalletModel.find();
  }

  async createSellerWallet(data: ISellerWallet) {
    return SellerWalletModel.create(data);
  }

  async findSellerWalletById(id: string) {
    return SellerWalletModel.findById(id);
  }

  async updateSellerWallet(id: string, data: Partial<ISellerWallet>) {
    return SellerWalletModel.updateOne({ _id: id }, data);
  }

  async deleteSellerWallet(id: string) {
    return SellerWalletModel.deleteOne({ _id: id });
  }
}

export default SellerWalletRepository;

import { IBranchInventory } from "./branchinventory.interface";
import { BranchInventoryModel } from "./branchinventory.model";

class BranchInventoryRepository {
  async findAllBranchInventorys() {
    return BranchInventoryModel.find();
  }

  async createBranchInventory(data: IBranchInventory) {
    return BranchInventoryModel.create(data);
  }

  async findBranchInventoryById(id: string) {
    return BranchInventoryModel.findById(id);
  }

  async updateBranchInventory(id: string, data: Partial<IBranchInventory>) {
    return BranchInventoryModel.updateOne({ _id: id }, data);
  }

  async deleteBranchInventory(id: string) {
    return BranchInventoryModel.deleteOne({ _id: id });
  }
}

export default BranchInventoryRepository;

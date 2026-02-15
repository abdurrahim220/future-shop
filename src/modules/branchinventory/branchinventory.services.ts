import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IBranchInventory } from "./branchinventory.interface";
import BranchInventoryRepository from "./branchinventory.repository";

class BranchInventoryService {
  constructor(private branchinventoryRepo: BranchInventoryRepository) {}

  async createBranchInventory(data: IBranchInventory) {
    return this.branchinventoryRepo.createBranchInventory(data);
  }

  async findAllBranchInventorys() {
    return this.branchinventoryRepo.findAllBranchInventorys();
  }

  async findBranchInventoryById(id: string) {
    if (!id) {
      throw new AppError(
        "Enter a valid branchinventory Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.branchinventoryRepo.findBranchInventoryById(id);
  }

  async updateBranchInventory(id: string, data: Partial<IBranchInventory>) {
    if (!id) {
      throw new AppError(
        "Enter a valid branchinventory Id",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.branchinventoryRepo.updateBranchInventory(id, data);
  }

  async deleteBranchInventory(id: string) {
    return this.branchinventoryRepo.deleteBranchInventory(id);
  }
}

export default BranchInventoryService;

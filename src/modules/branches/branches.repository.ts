import { IBranches } from "./branches.interface";
import { BranchesModel } from "./branches.model";

class BranchesRepository {
  async findAllBranchess() {
    return BranchesModel.find().populate("sellerId");
  }

  async createBranches(data: IBranches) {
    return BranchesModel.create(data);
  }

  async findBranchesById(id: string) {
    return BranchesModel.findById(id).populate("sellerId");
  }

  async updateBranches(id: string, data: Partial<IBranches>) {
    return BranchesModel.updateOne({ _id: id }, data);
  }

  async deleteBranches(id: string) {
    return BranchesModel.deleteOne({ _id: id });
  }
}

export default BranchesRepository;

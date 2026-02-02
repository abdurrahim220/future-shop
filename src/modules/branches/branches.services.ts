import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IBranches } from "./branches.interface";
import BranchesRepository from "./branches.repository";

class BranchesService {
  constructor(private branchesRepo: BranchesRepository) {}

  async createBranches(data: IBranches) {
    return this.branchesRepo.createBranches(data);
  }

  async findAllBranchess() {
    return this.branchesRepo.findAllBranchess();
  }

  async findBranchesById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid branches Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.branchesRepo.findBranchesById(id);
  }

  async updateBranches(id: string, data: Partial<IBranches>) {
    if (!id) {
      throw new AppError("Enter a valid branches Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.branchesRepo.updateBranches(id, data);
  }

  async deleteBranches(id: string) {
    return this.branchesRepo.deleteBranches(id);
  }
}

export default BranchesService;

import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BranchesService from "./branches.services";
import { Request, Response } from "express";

class BranchesController {
  constructor(private branchesService: BranchesService) {}

  createBranches = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.branchesService.createBranches(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Branches created successfully",
      data: result,
    });
  });

  getAllBranchess = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.branchesService.findAllBranchess();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Branchess fetched successfully",
      data: result,
    });
  });

  getBranchesById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchesService.findBranchesById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Branches fetched successfully",
      data: result,
    });
  });

  updateBranches = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchesService.updateBranches(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Branches updated successfully",
      data: result,
    });
  });

  deleteBranches = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchesService.deleteBranches(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Branches deleted successfully",
      data: result,
    });
  });
}

export default BranchesController;

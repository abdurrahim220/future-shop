import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BranchInventoryService from "./branchinventory.services";
import { Request, Response } from "express";

class BranchInventoryController {
  constructor(private branchinventoryService: BranchInventoryService) {}

  createBranchInventory = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result =
      await this.branchinventoryService.createBranchInventory(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "BranchInventory created successfully",
      data: result,
    });
  });

  getAllBranchInventorys = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.branchinventoryService.findAllBranchInventorys();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "BranchInventorys fetched successfully",
      data: result,
    });
  });

  getBranchInventoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchinventoryService.findBranchInventoryById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "BranchInventory fetched successfully",
      data: result,
    });
  });

  updateBranchInventory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchinventoryService.updateBranchInventory(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "BranchInventory updated successfully",
      data: result,
    });
  });

  deleteBranchInventory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.branchinventoryService.deleteBranchInventory(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "BranchInventory deleted successfully",
      data: result,
    });
  });
}

export default BranchInventoryController;

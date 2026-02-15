import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import StockMovementService from "./stockmovement.services";
import { Request, Response } from "express";

class StockMovementController {
  constructor(private stockmovementService: StockMovementService) {}

  createStockMovement = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.stockmovementService.createStockMovement(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockMovement created successfully",
      data: result,
    });
  });

  getAllStockMovements = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.stockmovementService.findAllStockMovements();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockMovements fetched successfully",
      data: result,
    });
  });

  getStockMovementById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stockmovementService.findStockMovementById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockMovement fetched successfully",
      data: result,
    });
  });

  updateStockMovement = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stockmovementService.updateStockMovement(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockMovement updated successfully",
      data: result,
    });
  });

  deleteStockMovement = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stockmovementService.deleteStockMovement(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockMovement deleted successfully",
      data: result,
    });
  });
}

export default StockMovementController;

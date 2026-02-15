import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import StockTransferService from "./stocktransfer.services";
import { Request, Response } from "express";

class StockTransferController {
  constructor(private stocktransferService: StockTransferService) {}

  createStockTransfer = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.stocktransferService.createStockTransfer(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockTransfer created successfully",
      data: result,
    });
  });

  getAllStockTransfers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.stocktransferService.findAllStockTransfers();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockTransfers fetched successfully",
      data: result,
    });
  });

  getStockTransferById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stocktransferService.findStockTransferById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockTransfer fetched successfully",
      data: result,
    });
  });

  updateStockTransfer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stocktransferService.updateStockTransfer(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockTransfer updated successfully",
      data: result,
    });
  });

  deleteStockTransfer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.stocktransferService.deleteStockTransfer(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "StockTransfer deleted successfully",
      data: result,
    });
  });
}

export default StockTransferController;

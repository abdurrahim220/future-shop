import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import SellerService from "./seller.services";
import { Request, Response } from "express";

class SellerController {
  constructor(private sellerService: SellerService) {}

  createSeller = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.sellerService.createSeller(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller created successfully",
      data: result,
    });
  });

  getAllSellers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.sellerService.findAllSellers();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Sellers fetched successfully",
      data: result,
    });
  });

  getSellerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerService.findSellerById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller fetched successfully",
      data: result,
    });
  });

  updateSeller = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerService.updateSeller(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller updated successfully",
      data: result,
    });
  });

  deleteSeller = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerService.deleteSeller(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller deleted successfully",
      data: result,
    });
  });
}

export default SellerController;

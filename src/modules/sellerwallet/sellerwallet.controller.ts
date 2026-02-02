import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import SellerWalletService from "./sellerwallet.services";
import { Request, Response } from "express";

class SellerWalletController {
  constructor(private sellerwalletService: SellerWalletService) {}

  createSellerWallet = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.sellerwalletService.createSellerWallet(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SellerWallet created successfully",
      data: result,
    });
  });

  getAllSellerWallets = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.sellerwalletService.findAllSellerWallets();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SellerWallets fetched successfully",
      data: result,
    });
  });

  getSellerWalletById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerwalletService.findSellerWalletById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SellerWallet fetched successfully",
      data: result,
    });
  });

  updateSellerWallet = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerwalletService.updateSellerWallet(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SellerWallet updated successfully",
      data: result,
    });
  });

  deleteSellerWallet = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.sellerwalletService.deleteSellerWallet(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SellerWallet deleted successfully",
      data: result,
    });
  });
}

export default SellerWalletController;

import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PayoutService from "./payout.services";
import { Request, Response } from "express";

class PayoutController {
  constructor(private payoutService: PayoutService) {}

  createPayout = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.payoutService.createPayout(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Payout created successfully",
      data: result,
    });
  });

  getAllPayouts = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.payoutService.findAllPayouts();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Payouts fetched successfully",
      data: result,
    });
  });

  getPayoutById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.payoutService.findPayoutById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Payout fetched successfully",
      data: result,
    });
  });

  updatePayout = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.payoutService.updatePayout(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Payout updated successfully",
      data: result,
    });
  });

  deletePayout = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.payoutService.deletePayout(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Payout deleted successfully",
      data: result,
    });
  });
}

export default PayoutController;

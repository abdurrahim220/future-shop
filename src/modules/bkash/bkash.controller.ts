import { Request, Response } from "express";
import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BkashService from "./bkash.services";
import { config } from "../../config/config";

class BkashController {
  constructor(private bkashService: BkashService) {}

  createPayment = asyncHandler(async (req: Request, res: Response) => {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Missing amount or orderId",
      });
      return;
    }

    const result = await this.bkashService.createPayment(
      Number(amount),
      orderId as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "bKash checkout session created successfully",
      data: result,
    });
  });

  callbackPayment = asyncHandler(async (req: Request, res: Response) => {
    const paymentID = req.query.paymentID as string;
    const status = req.query.status as string;

    const redirectBase = config.frontend_url;

    if (status === "cancel") {
      res.redirect(`${redirectBase}/payment/cancelled`);
      return;
    }

    if (status === "failure" || !paymentID) {
      res.redirect(`${redirectBase}/payment/failed`);
      return;
    }

    try {
      const result = await this.bkashService.executePayment(paymentID);
      res.redirect(
        `${redirectBase}/payment/success?orderId=${result.orderId}&trxId=${result.trxId}`,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("bKash Callback Execution Error:", msg);
      res.redirect(`${redirectBase}/payment/failed`);
    }
  });
}

export default BkashController;

import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import SellerService from "./seller.services";
import { Request, Response } from "express";

class SellerController {
  constructor(private sellerService: SellerService) {}

  requestForSeller = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await this.sellerService.requestForSeller(userId as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller request sent successfully",
      data: result,
    });
  });

  createSeller = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const userId = req.user?.id;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Extract buffers from uploaded files
    const imageBuffers = {
      logo: files?.logo?.[0]?.buffer,
      banner: files?.banner?.[0]?.buffer,
      tradeLicense: files?.tradeLicense?.[0]?.buffer,
    };

    const result = await this.sellerService.createSeller(newData, imageBuffers, userId as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller created successfully",
      data: result,
    });
  });

  getAllSellers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.sellerService.findAllSellers(req.query);
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
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Extract buffers from uploaded files (if any)
    const imageBuffers = files
      ? {
          logo: files?.logo?.[0]?.buffer,
          banner: files?.banner?.[0]?.buffer,
          tradeLicense: files?.tradeLicense?.[0]?.buffer,
        }
      : undefined;

    const result = await this.sellerService.updateSeller(
      id as string,
      req.body,
      imageBuffers,
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

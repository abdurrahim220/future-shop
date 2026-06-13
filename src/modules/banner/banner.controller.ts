import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BannerService from "./banner.services";
import { Request, Response } from "express";
import AppError from "../../errors/appError";

class BannerController {
  constructor(private bannerService: BannerService) {}

  createBanner = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const file = req.file;
    if (!file) {
      throw new AppError("File is required", HTTP_STATUS.BAD_REQUEST);
    }
    const buffer = file.buffer;
    const result = await this.bannerService.createBanner(newData, buffer);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  });

  getAllBanners = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.bannerService.findAllBanners();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Banners fetched successfully",
      data: result,
    });
  });

  getBannerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.bannerService.findBannerById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Banner fetched successfully",
      data: result,
    });
  });

  updateBanner = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req?.file;
    const buffer = file?.buffer;
    const result = await this.bannerService.updateBanner(id as string, req.body, buffer);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Banner updated successfully",
      data: result,
    });
  });

  deleteBanner = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.bannerService.deleteBanner(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Banner deleted successfully",
      data: result,
    });
  });
}

export default BannerController;
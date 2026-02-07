import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BrandsService from "./brands.services";
import { Request, Response } from "express";

class BrandsController {
  constructor(private brandsService: BrandsService) {}

  createBrands = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const file = req.file;
    if (!file) {
      throw new AppError("File is required", HTTP_STATUS.BAD_REQUEST);
    }
    const buffer = file.buffer;
    const result = await this.brandsService.createBrands(newData, buffer);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Brands created successfully",
      data: result,
    });
  });

  getAllBrands = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.brandsService.findAllBrands(req.query);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Brands fetched successfully",
      data: result,
    });
  });

  getBrandsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.brandsService.findBrandsById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Brands fetched successfully",
      data: result,
    });
  });

  updateBrands = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req?.file;
    const buffer = file?.buffer;
    const result = await this.brandsService.updateBrands(
      id as string,
      req.body,
      buffer,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Brands updated successfully",
      data: result,
    });
  });

  deleteBrands = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.brandsService.deleteBrands(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Brands deleted successfully",
      data: result,
    });
  });
}

export default BrandsController;

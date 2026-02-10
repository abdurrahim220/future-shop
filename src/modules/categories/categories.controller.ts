import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CategoriesService from "./categories.services";
import { Request, Response } from "express";

class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  createCategories = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const file = req.file;
    if (!file) {
      throw new AppError("File is required", HTTP_STATUS.BAD_REQUEST);
    }
    const buffer = file.buffer;
    const result = await this.categoriesService.createCategories(
      newData,
      buffer,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Categories created successfully",
      data: result,
    });
  });

  getAllCategoriess = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.categoriesService.findAllCategoriess(req.query);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Categoriess fetched successfully",
      data: result,
    });
  });

  getCategoriesById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.categoriesService.findCategoriesById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  });

  updateCategories = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file;
    const buffer = file?.buffer;
    const result = await this.categoriesService.updateCategories(
      id as string,
      req.body,
      buffer,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Categories updated successfully",
      data: result,
    });
  });

  deleteCategories = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.categoriesService.deleteCategories(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Categories deleted successfully",
      data: result,
    });
  });
}

export default CategoriesController;

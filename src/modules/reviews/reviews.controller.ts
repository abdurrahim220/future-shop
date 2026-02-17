import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ReviewsService from "./reviews.services";
import { Request, Response } from "express";

class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  createReviews = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.reviewsService.createReviews(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Reviews created successfully",
      data: result,
    });
  });

  getAllReviewss = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.reviewsService.findAllReviewss();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Reviewss fetched successfully",
      data: result,
    });
  });

  getReviewsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.reviewsService.findReviewsById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  });

  updateReviews = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.reviewsService.updateReviews(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Reviews updated successfully",
      data: result,
    });
  });

  deleteReviews = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.reviewsService.deleteReviews(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Reviews deleted successfully",
      data: result,
    });
  });
}

export default ReviewsController;
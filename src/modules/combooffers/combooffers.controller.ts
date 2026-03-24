import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ComboOffersService from "./combooffers.services";
import { Request, Response } from "express";

class ComboOffersController {
  constructor(private combooffersService: ComboOffersService) {}

  createComboOffers = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.combooffersService.createComboOffers(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "ComboOffers created successfully",
      data: result,
    });
  });

  getAllComboOfferss = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.combooffersService.findAllComboOfferss(req.query);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "ComboOfferss fetched successfully",
      data: result,
    });
  });

  getComboOffersById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.combooffersService.findComboOffersById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "ComboOffers fetched successfully",
      data: result,
    });
  });

  updateComboOffers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.combooffersService.updateComboOffers(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "ComboOffers updated successfully",
      data: result,
    });
  });

  deleteComboOffers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.combooffersService.deleteComboOffers(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "ComboOffers deleted successfully",
      data: result,
    });
  });
}

export default ComboOffersController;

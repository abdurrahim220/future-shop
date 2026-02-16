import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CuponsService from "./cupons.services";
import { Request, Response } from "express";

class CuponsController {
  constructor(private cuponsService: CuponsService) {}

  createCupons = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.cuponsService.createCupons(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cupons created successfully",
      data: result,
    });
  });

  getAllCuponss = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.cuponsService.findAllCuponss();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cuponss fetched successfully",
      data: result,
    });
  });

  getCuponsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cuponsService.findCuponsById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cupons fetched successfully",
      data: result,
    });
  });

  updateCupons = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cuponsService.updateCupons(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cupons updated successfully",
      data: result,
    });
  });

  deleteCupons = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cuponsService.deleteCupons(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cupons deleted successfully",
      data: result,
    });
  });
}

export default CuponsController;
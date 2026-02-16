import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import SubOrderService from "./suborder.services";
import { Request, Response } from "express";

class SubOrderController {
  constructor(private suborderService: SubOrderService) {}

  createSubOrder = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.suborderService.createSubOrder(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SubOrder created successfully",
      data: result,
    });
  });

  getAllSubOrders = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.suborderService.findAllSubOrders();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SubOrders fetched successfully",
      data: result,
    });
  });

  getSubOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.suborderService.findSubOrderById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SubOrder fetched successfully",
      data: result,
    });
  });

  updateSubOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.suborderService.updateSubOrder(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SubOrder updated successfully",
      data: result,
    });
  });

  deleteSubOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.suborderService.deleteSubOrder(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "SubOrder deleted successfully",
      data: result,
    });
  });
}

export default SubOrderController;

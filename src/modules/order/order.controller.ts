import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import OrderService from "./order.services";
import { Request, Response } from "express";

class OrderController {
  constructor(private orderService: OrderService) {}

  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.orderService.createOrder(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  });

  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.orderService.findAllOrders();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  });

  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.orderService.findOrderById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  });

  updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.orderService.updateOrder(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  });

  deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.orderService.deleteOrder(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Order deleted successfully",
      data: result,
    });
  });
}

export default OrderController;

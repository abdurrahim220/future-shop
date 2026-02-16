import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CartService from "./cart.services";
import { Request, Response } from "express";

class CartController {
  constructor(private cartService: CartService) {}

  createCart = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.cartService.createCart(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cart created successfully",
      data: result,
    });
  });

  getAllCarts = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.cartService.findAllCarts();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Carts fetched successfully",
      data: result,
    });
  });

  getCartById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cartService.findCartById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cart fetched successfully",
      data: result,
    });
  });

  updateCart = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cartService.updateCart(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cart updated successfully",
      data: result,
    });
  });

  deleteCart = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.cartService.deleteCart(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Cart deleted successfully",
      data: result,
    });
  });
}

export default CartController;

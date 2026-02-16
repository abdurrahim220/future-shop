import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import WishlistService from "./wishlist.services";
import { Request, Response } from "express";

class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  createWishlist = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.wishlistService.createWishlist(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Wishlist created successfully",
      data: result,
    });
  });

  getAllWishlists = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.wishlistService.findAllWishlists();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Wishlists fetched successfully",
      data: result,
    });
  });

  getWishlistById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.wishlistService.findWishlistById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Wishlist fetched successfully",
      data: result,
    });
  });

  updateWishlist = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.wishlistService.updateWishlist(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Wishlist updated successfully",
      data: result,
    });
  });

  deleteWishlist = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.wishlistService.deleteWishlist(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Wishlist deleted successfully",
      data: result,
    });
  });
}

export default WishlistController;

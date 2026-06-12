import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.services";
import { Request, Response } from "express";
import AppError from "../../errors/appError";

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const newData = req.body;
    const sellerId = req.user.id;
    const result = await this.productService.createProduct(sellerId, newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  });

  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    // If user is seller, return only their products.
    // Otherwise, check if a specific sellerId is requested in query params.
    let sellerId =
      req.user && req.user.role === "seller" ? req.user.id : undefined;

    if (!sellerId && req.query.sellerId) {
      sellerId = req.query.sellerId as string;
    }

    const result = await this.productService.findAllProducts(sellerId);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  });

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.productService.findProductById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const { id } = req.params;
    const sellerId = req.user.id;
    const result = await this.productService.updateProduct(
      id as string,
      sellerId,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  });

  createVariant = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const { productId } = req.params;
    const sellerId = req.user.id;
    const newData = req.body;
    const result = await this.productService.createVariant(
      productId as string,
      sellerId,
      newData,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Variant created successfully",
      data: result,
    });
  });

  bulkCreateVariants = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const { productId } = req.params;
    const sellerId = req.user.id;
    const newData = req.body;
    const result = await this.productService.bulkCreateVariants(
      productId as string,
      sellerId,
      newData,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Variants created successfully",
      data: result,
    });
  });
}

const productController = new ProductController();
export default productController;

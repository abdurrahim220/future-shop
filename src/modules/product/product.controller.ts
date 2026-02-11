import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ProductService from "./product.services";
import { Request, Response } from "express";

class ProductController {
  constructor(private productService: ProductService) {}

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.productService.createProduct(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  });

  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.productService.findAllProducts();
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
    const { id } = req.params;
    const result = await this.productService.updateProduct(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.productService.deleteProduct(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  });
}

export default ProductController;

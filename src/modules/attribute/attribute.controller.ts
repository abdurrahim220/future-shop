import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AttributeService from "./attribute.services";
import { Request, Response } from "express";

class AttributeController {
  constructor(private attributeService: AttributeService) {}

  createAttribute = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.attributeService.createAttribute(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Attribute created successfully",
      data: result,
    });
  });

  getAllAttributes = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.attributeService.findAllAttributes();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Attributes fetched successfully",
      data: result,
    });
  });

  getAttributeById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributeService.findAttributeById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Attribute fetched successfully",
      data: result,
    });
  });

  updateAttribute = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributeService.updateAttribute(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Attribute updated successfully",
      data: result,
    });
  });

  deleteAttribute = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributeService.deleteAttribute(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Attribute deleted successfully",
      data: result,
    });
  });
}

export default AttributeController;

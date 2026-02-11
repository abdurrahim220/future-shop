import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AttributeValueService from "./attributevalue.services";
import { Request, Response } from "express";

class AttributeValueController {
  constructor(private attributevalueService: AttributeValueService) {}

  createAttributeValue = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result =
      await this.attributevalueService.createAttributeValue(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AttributeValue created successfully",
      data: result,
    });
  });

  getAllAttributeValues = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.attributevalueService.findAllAttributeValues();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AttributeValues fetched successfully",
      data: result,
    });
  });

  getAttributeValueById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributevalueService.findAttributeValueById(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AttributeValue fetched successfully",
      data: result,
    });
  });

  updateAttributeValue = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributevalueService.updateAttributeValue(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AttributeValue updated successfully",
      data: result,
    });
  });

  deleteAttributeValue = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.attributevalueService.deleteAttributeValue(
      id as string,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AttributeValue deleted successfully",
      data: result,
    });
  });
}

export default AttributeValueController;

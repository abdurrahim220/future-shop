import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AddressService from "./address.services";
import { Request, Response } from "express";

class AddressController {
  constructor(private addressService: AddressService) {}

  createAddress = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.addressService.createAddress(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Address created successfully",
      data: result,
    });
  });

  getAllAddresss = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.addressService.findAllAddresss();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Addresss fetched successfully",
      data: result,
    });
  });

  getAddressById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.addressService.findAddressById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Address fetched successfully",
      data: result,
    });
  });

  updateAddress = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.addressService.updateAddress(
      id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Address updated successfully",
      data: result,
    });
  });

  deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.addressService.deleteAddress(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Address deleted successfully",
      data: result,
    });
  });
}

export default AddressController;

import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import UserService from "./user.services";
import { Request, Response } from "express";

class UserController {
  constructor(private userService: UserService) {}

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const newUser = req.body;
    await this.userService.createUser(newUser);
    sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: "User created successfully",
      data: null,
    });
  });

  verifyUserOtp = asyncHandler(async (req: Request, res: Response) => {
    const { otp } = req.body;
    const result = await this.userService.verifyUserOtp(otp);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User verified successfully",
      data: result,
    });
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.userService.findAllUsers();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.userService.findUserById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userService.updateUser(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: "User updated successfully",
      data: null,
    });
  });

  updateUserPassword = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    await this.userService.changeUserPassword(
      id as string,
      newPassword,
      oldPassword,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: "User password updated successfully",
      data: null,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userService.deleteUser(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  });
}

export default UserController;

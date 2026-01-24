import { config } from "../../config/config";
import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";
import { Request, Response } from "express";
export class AuthController {
  constructor(private authService: AuthService) {}

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Login successful",
      data: result.accessToken,
    });
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await this.authService.refreshToken(refreshToken);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Refresh token successful",
      data: result.accessToken,
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Logout successful",
      data: result,
    });
  });
}

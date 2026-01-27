import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { RefreshTokenPayload } from "../../interface/jwtInterface";
import { UserModel } from "../user/user.model";
import { AuthLoginInput } from "./auth.interface";
import { generateTokens } from "./auth.utils";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
export class AuthService {
  async login(payload: AuthLoginInput) {
    const { email, phone, password } = payload;

    if (!email && !phone) {
      throw new AppError(
        "Enter your email or phone number",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const user = await UserModel.findOne({
      $or: [{ email }, { phone }],
    }).select("+password");

    if (!user) {
      throw new AppError("Invalid user", HTTP_STATUS.NOT_FOUND);
    }

    if (user.status === "blocked") {
      throw new AppError(
        "Your account has been blocked",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    if (!user.isVerified) {
      throw new AppError(
        "Please verify your email or phone number",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new AppError("Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
    }

    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      role: user.role,
    });

    await UserModel.updateOne({ _id: user._id }, { refreshToken });

    return {
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", HTTP_STATUS.UNAUTHORIZED);
    }

    let decoded: RefreshTokenPayload;

    try {
      decoded = jwt.verify(
        refreshToken,
        config.JWT_REFRESH_SECRET as string,
      ) as RefreshTokenPayload;
    } catch (error) {
      console.log(error);
      throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new AppError("Invalid user", HTTP_STATUS.NOT_FOUND);
    }
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    if (user.status === "blocked") {
      throw new AppError(
        "Your account has been blocked",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    const tokens = generateTokens({
      id: user._id,
      role: user.role,
    });

    await UserModel.updateOne(
      { _id: user._id },
      { refreshToken: tokens.refreshToken },
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    const decoded = jwt.verify(
      refreshToken,
      config.JWT_REFRESH_SECRET as string,
    ) as RefreshTokenPayload;
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new AppError("Invalid user", HTTP_STATUS.NOT_FOUND);
    }
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }
    await UserModel.updateOne({ _id: user._id }, { refreshToken: "" });

    return {
      accessToken: "",
      refreshToken: "",
    };
  }
}

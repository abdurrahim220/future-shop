import { config } from "../config/config";
import AppError from "../errors/appError";
import { HTTP_STATUS } from "../errors/httpStatus";
import { AccessTokenPayload } from "../interface/jwtInterface";
import { UserRole } from "../interface/Role";
import { UserModel } from "../modules/user/user.model";
import asyncHandler from "../utils/catchAsync";
import jwt from "jsonwebtoken";

const auth = (...requiredRoles: UserRole[]) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    let decoded: AccessTokenPayload;

    try {
      const verified = jwt.verify(token, config.JWT_SECRET as string);

      if (typeof verified === "string") {
        throw new Error();
      }

      decoded = verified as AccessTokenPayload;
    } catch {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const { role, id, iat } = decoded;

    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
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

    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        "Token expired due to password change",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(
        "You are not authorized to access this route",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    req.user = decoded;

    next();
  });
};

export default auth;

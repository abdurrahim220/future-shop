import jwt from "jsonwebtoken";
import { AuthPayload } from "./auth.interface";
import { config } from "../../config/config";

export const generateTokens = (payload: AuthPayload) => {
  const accessToken = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    config.JWT_SECRET as string,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    config.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};

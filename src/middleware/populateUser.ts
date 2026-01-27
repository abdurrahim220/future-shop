import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AccessTokenPayload } from "../interface/jwtInterface";

export function populateUser(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();

  const token = authHeader.split(" ")[1];
  if (!token) return next();

  try {
    const verified = jwt.verify(token, config.JWT_SECRET as string);
    if (typeof verified === "string") return next();

    req.user = verified as AccessTokenPayload;
  } catch {
    // ❌ DO NOTHING — public routes must still work
  }

  next();
}

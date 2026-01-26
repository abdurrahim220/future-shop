import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export function auditContext(req: Request, _res: Response, next: NextFunction) {
  const role = normalizeRole(req.user?.role);

  req.auditContext = {
    ...(req.user?.id && {
      userId: new Types.ObjectId(req.user.id),
    }),
    role,
  };

  next();
}

function normalizeRole(role?: string): "ADMIN" | "SELLER" | "SYSTEM" {
  if (!role) return "SYSTEM";

  switch (role.toUpperCase()) {
    case "ADMIN":
      return "ADMIN";
    case "SELLER":
      return "SELLER";
    default:
      return "SYSTEM";
  }
}

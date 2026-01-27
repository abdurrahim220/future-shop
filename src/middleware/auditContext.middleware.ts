import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { PerformedByRole } from "../modules/auditLogs/auditLog.interface";

export function auditContext(req: Request, _res: Response, next: NextFunction) {
  // console.log("performedByRole", req.user);
  const performedByRole = normalizeRole(req.user?.role);
  // console.log("performedByRole", performedByRole);
  req.auditContext = {
    ...(req.user?.id && {
      userId: new Types.ObjectId(req.user.id),
    }),
    performedByRole,
  };

  next();
}

function normalizeRole(role?: string): PerformedByRole {
  if (!role) return "SYSTEM";

  switch (role.toUpperCase()) {
    case "ADMIN":
      return "ADMIN";
    case "SELLER":
      return "SELLER";
    case "CUSTOMER":
      return "CUSTOMER";
    default:
      return "SYSTEM";
  }
}

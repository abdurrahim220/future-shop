import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      auditContext?: {
        userId?: Types.ObjectId;
        role: "ADMIN" | "SELLER" | "SYSTEM";
      };
    }
  }
}

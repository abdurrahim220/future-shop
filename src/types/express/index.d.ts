import { Types } from "mongoose";
import { AccessTokenPayload } from "../../interface/jwtInterface";
import { PerformedByRole } from "../../modules/auditLogs/auditLog.interface";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
      auditContext?: {
        userId?: Types.ObjectId;
        performedByRole: PerformedByRole;
      };
    }
  }
}

export {};

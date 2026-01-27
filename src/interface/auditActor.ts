import { Types } from "mongoose";
import { PerformedByRole } from "../modules/auditLogs/auditLog.interface";

export type AuditActor = {
  userId?: Types.ObjectId;
  performedByRole: PerformedByRole;
};

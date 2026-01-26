import { Types } from "mongoose";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "STATUS_CHANGE"
  | "LOGIN"
  | "LOGOUT";

export type EntityType = "USER" | "SELLER" | "ORDER" | "PRODUCT";

export type PerformedByRole = "ADMIN" | "SELLER" | "SYSTEM" | "CUSTOMER";

export interface IAuditChange {
  from: unknown;
  to: unknown;
}

export interface IAuditLog {
  userId?: Types.ObjectId;
  performedByRole: PerformedByRole;
  action: AuditAction;
  entityType: EntityType;
  entityId: Types.ObjectId;
  changes?: Record<string, IAuditChange>;
  createdAt: Date;
}

import { Types } from "mongoose";
import { AuditLogModel } from "./auditLog.model";
import {
  AuditAction,
  EntityType,
  PerformedByRole,
  IAuditChange,
} from "./auditLog.interface";

interface CreateAuditLogParams {
  userId?: Types.ObjectId;
  performedByRole: PerformedByRole;
  action: AuditAction;
  entityType: EntityType;
  entityId: Types.ObjectId;
  changes?: Record<string, IAuditChange>;
}

export class AuditLogService {
  static async create(params: CreateAuditLogParams) {
    return AuditLogModel.create({
      ...(params.userId && { userId: params.userId }),
      performedByRole: params.performedByRole,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      ...(params.changes && { changes: params.changes }),
    });
  }
}

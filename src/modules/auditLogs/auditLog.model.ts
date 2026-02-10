import { Schema, model } from "mongoose";
import { IAuditLog } from "./auditLog.interface";

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    performedByRole: {
      type: String,
      enum: ["ADMIN", "SELLER", "SYSTEM", "CUSTOMER"],
      required: true,
    },

    action: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "SOFT_DELETE",
        "BLOCK",
        "UNBLOCK",
        "ROLE_CHANGE",
        "RESTORE",
        "STATUS_CHANGE",
        "LOGIN",
        "LOGOUT",
        "SELLER_REQUEST",
      ],
      required: true,
      index: true,
    },

    entityType: {
      type: String,
      enum: ["USER", "SELLER", "ORDER", "PRODUCT", "CATEGORY", "BRAND"],
      required: true,
      index: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    changes: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

/* 🔥 Critical indexes for filtering & pagination */
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });

export const AuditLogModel = model<IAuditLog>("AuditLog", auditLogSchema);

import { z } from "zod";

export const auditChangeSchema = z.object({
  from: z.any(),
  to: z.any(),
});

export const createAuditLogSchema = z.object({
  body: z.object({
    userId: z.string().optional(),

    performedByRole: z.enum(["ADMIN", "SELLER", "SYSTEM"]),

    action: z.enum([
      "CREATE",
      "UPDATE",
      "DELETE",
      "STATUS_CHANGE",
      "LOGIN",
      "LOGOUT",
    ]),

    entityType: z.enum(["USER", "SELLER", "ORDER", "PRODUCT"]),

    entityId: z.string(),

    changes: z.record(z.string(), auditChangeSchema).optional(),
  }),
});

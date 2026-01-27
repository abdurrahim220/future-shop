import { Router } from "express";
import AuditLogRepository from "./auditLog.repository";
import { AuditLogService } from "./auditLog.services";
import AuditLogsController from "./auditLog.controller";

const router = Router();

const auditLogsRepo = new AuditLogRepository();
const auditLogsService = new AuditLogService(auditLogsRepo);
const auditLogsController = new AuditLogsController(auditLogsService);

router.get("/", auditLogsController.getAllAuditLogs);

export const auditLogsRouter = router;

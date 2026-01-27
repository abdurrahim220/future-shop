import asyncHandler from "../../utils/catchAsync";

import { Request, Response } from "express";
import { AuditLogService } from "./auditLog.services";
import sendResponse from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../errors/httpStatus";

class AuditLogsController {
  constructor(private auditLogsService: AuditLogService) {}

  getAllAuditLogs = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.auditLogsService.getAllAuditLogs(req.query);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "AuditLogs fetched successfully",
      data: result.item,
      meta: result.meta,
    });
  });
}

export default AuditLogsController;

import { HTTP_STATUS } from "../../errors/httpStatus";
import { AuditActor } from "../../interface/auditActor";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminService from "./admin.services";
import { Request, Response } from "express";

class AdminController {
  constructor(private adminService: AdminService) {}
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.adminService.findAllUsers(req.query);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Users fetched successfully",
      data: result.items,
      meta: result.meta,
    });
  });

  changeUserRole = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.changeUserRole(
      req.body,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User role changed successfully",
      data: result,
    });
  });

  updateSellerRequest = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.updateSellerRequest(
      req.body,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Seller request updated successfully",
      data: result,
    });
  });

  blockUser = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.blockUser(
      req.params.userId as string,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User blocked successfully",
      data: result,
    });
  });

  unblockUser = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.unblockUser(
      req.params.userId as string,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User unblocked successfully",
      data: result,
    });
  });

  restoreUser = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.restoreUser(
      req.params.userId as string,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User restored successfully",
      data: result,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const audit = req.auditContext;
    const result = await this.adminService.deleteUser(
      req.params.userId as string,
      audit as AuditActor,
    );
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  });
}

export default AdminController;

import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import NotificationsService from "./notifications.services";
import { Request, Response } from "express";

class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  createNotifications = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.notificationsService.createNotifications(newData);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Notifications created successfully",
      data: result,
    });
  });

  getAllNotificationss = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.notificationsService.findAllNotificationss();
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Notificationss fetched successfully",
      data: result,
    });
  });

  getNotificationsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.notificationsService.findNotificationsById(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Notifications fetched successfully",
      data: result,
    });
  });

  updateNotifications = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.notificationsService.updateNotifications(id as string, req.body);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Notifications updated successfully",
      data: result,
    });
  });

  deleteNotifications = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.notificationsService.deleteNotifications(id as string);
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Notifications deleted successfully",
      data: result,
    });
  });
}

export default NotificationsController;
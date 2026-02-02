import { Router } from "express";
import NotificationsController from "./notifications.controller";
import NotificationsService from "./notifications.services";
import NotificationsRepository from "./notifications.repository";
import zodValidate from "../../middleware/zodValidate";
import { createNotificationsZodSchema, updateNotificationsZodSchema } from "./notifications.zod";

const router = Router();

const notificationsRepository = new NotificationsRepository();
const notificationsService = new NotificationsService(notificationsRepository);
const notificationsController = new NotificationsController(notificationsService);

router.post("/", zodValidate(createNotificationsZodSchema), notificationsController.createNotifications);
router.get("/", notificationsController.getAllNotificationss);
router.get("/:id", notificationsController.getNotificationsById);
router.put("/:id", zodValidate(updateNotificationsZodSchema), notificationsController.updateNotifications);
router.delete("/:id", notificationsController.deleteNotifications);

export const NotificationsRoutes = router;
import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { INotifications } from "./notifications.interface";
import NotificationsRepository from "./notifications.repository";

class NotificationsService {
  constructor(private notificationsRepo: NotificationsRepository) {}

  async createNotifications(data: INotifications) {
    return this.notificationsRepo.createNotifications(data);
  }

  async findAllNotificationss() {
    return this.notificationsRepo.findAllNotificationss();
  }

  async findNotificationsById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid notifications Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.notificationsRepo.findNotificationsById(id);
  }

  async updateNotifications(id: string, data: Partial<INotifications>) {
    if (!id) {
      throw new AppError("Enter a valid notifications Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.notificationsRepo.updateNotifications(id, data);
  }

  async deleteNotifications(id: string) {
    return this.notificationsRepo.deleteNotifications(id);
  }
}

export default NotificationsService;
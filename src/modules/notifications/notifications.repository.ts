import { INotifications } from "./notifications.interface";
import { NotificationsModel } from "./notifications.model";

class NotificationsRepository {
  async findAllNotificationss() {
    return NotificationsModel.find();
  }

  async createNotifications(data: INotifications) {
    return NotificationsModel.create(data);
  }

  async findNotificationsById(id: string) {
    return NotificationsModel.findById(id);
  }

  async updateNotifications(id: string, data: Partial<INotifications>) {
    return NotificationsModel.updateOne({ _id: id }, data);
  }

  async deleteNotifications(id: string) {
    return NotificationsModel.deleteOne({ _id: id });
  }
}

export default NotificationsRepository;
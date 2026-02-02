import { Schema, model } from "mongoose";
import { INotifications } from "./notifications.interface";

const notificationsSchema = new Schema<INotifications>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const NotificationsModel = model<INotifications>("Notifications", notificationsSchema);
import { Schema, model } from "mongoose";
import { INotifications } from "./notifications.interface";

const notificationsSchema = new Schema<INotifications>(
  {
    type: {
      type: String,
      trime: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      index: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const NotificationsModel = model<INotifications>(
  "Notifications",
  notificationsSchema,
);

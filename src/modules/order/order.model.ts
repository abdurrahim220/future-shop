import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import {
  deliveryTypeEnum,
  orderStatusEnum,
  paymentStatusEnum,
} from "../../interface/enums";

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: orderStatusEnum,
      default: orderStatusEnum.pending,
    },
    paymentStatus: {
      type: String,
      enum: paymentStatusEnum,
      default: paymentStatusEnum.unpaid,
    },
    deliveryStatus: {
      type: String,
      enum: deliveryTypeEnum,
      default: deliveryTypeEnum.home,
    },
  },
  { timestamps: true },
);

export const OrderModel = model<IOrder>("Order", orderSchema);

import { Types } from "mongoose";
import {
  deliveryTypeEnum,
  orderStatusEnum,
  paymentStatusEnum,
} from "../../interface/enums";

export interface IOrder {
  _id: string;
  customerId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  sellerId: Types.ObjectId;
  branchId: Types.ObjectId;
  price: number;
  quantity: number;
  subtotal: number;
  status: orderStatusEnum;
  paymentStatus: paymentStatusEnum;
  deliveryStatus: deliveryTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

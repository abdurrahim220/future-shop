import { Types } from "mongoose";
import { mainStatusEnum } from "../../interface/enums";

export interface IComboOffers {
  _id: string;
  title: string;
  discountType: string;
  discountValue: number;
  products: { productId: Types.ObjectId; quantityRequired: number }[];
  startDate: Date;
  endDate: Date;
  status: mainStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

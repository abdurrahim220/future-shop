import { mainStatusEnum } from "../../interface/enums";

export interface ICupons {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxDiscount: number;
  minPurchaseAmount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validTo: Date;
  status: mainStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

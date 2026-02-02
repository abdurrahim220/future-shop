import { Types } from "mongoose";

export interface IBranches {
  sellerId: Types.ObjectId;

  branchName: string;
  branchCode: string;

  type: "store" | "warehouse";

  phone: string;
  address: string;
  city: string;
  state: string;

  status: "active" | "inactive";

  createdAt?: Date;
  updatedAt?: Date;
}

import { Types } from "mongoose";

export interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

export interface ISeller {
  userId: Types.ObjectId;

  shopName: string;

  logo?: IImageSet;
  banner?: IImageSet;
  logoPublicId?: string;
  bannerPublicId?: string;

  tradeLicense?: IImageSet;
  tradeLicensePublicId?: string;

  address: Types.ObjectId;

  commissionPercentage: number;

  status: "pending" | "approved" | "rejected" | "suspended";

  createdAt?: Date;
  updatedAt?: Date;
}

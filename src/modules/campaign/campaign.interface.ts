import { Types } from "mongoose";
import { mainStatusEnum } from "../../interface/enums";
import { IImageSet } from "../seller/seller.interface";

export interface ICampaign {
  _id: string;
  slug: string;
  title: string;
  description: string;
  bannerImg: IImageSet;
  products: Types.ObjectId[];
  categories: Types.ObjectId[];
  brands: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  status: mainStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

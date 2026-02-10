import { Types } from "mongoose";
export interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}
export interface ICategories {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  parentId?: Types.ObjectId;
  icon: IImageSet;
  public_id: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Types } from "mongoose";
export interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}
export interface ICategories {
  _id?: string | Types.ObjectId;
  name: string;
  slug: string;
  parentId?: string | Types.ObjectId;
  icon: IImageSet;
  public_id: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

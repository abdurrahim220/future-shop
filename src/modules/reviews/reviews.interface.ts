import { Types } from "mongoose";
import { IImageSet } from "../../interface/imageSchema";

export interface IReviews {
  _id: string;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  images: IImageSet[];
  public_id: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

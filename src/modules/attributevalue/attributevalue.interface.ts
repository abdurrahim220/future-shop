import { Types } from "mongoose";

export interface IAttributeValue {
  _id: string;
  attributeId: Types.ObjectId;
  value: string;
  hexCode?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

import { IImageSet } from "../../interface/imageSchema";

export interface IBanner {
  name: string;
  image: IImageSet;
  public_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
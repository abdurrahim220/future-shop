export interface IAttribute {
  _id: string;
  name: string;
  slug: string;
  type: "image" | "text" | "number";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

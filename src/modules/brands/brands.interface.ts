export interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

export interface IBrands {
  name: string;
  slug: string;
  logo: IImageSet;
  public_id: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

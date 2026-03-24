export const imageSchema = {
  small: { type: String },
  medium: { type: String },
  large: { type: String },
  original: { type: String },
};
export interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

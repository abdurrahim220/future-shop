import { Types } from "mongoose";

interface IAttributeValuePair {
  attributeId: Types.ObjectId;
  attributeValueId: Types.ObjectId;
}

export function generateVariantKey(
  attributeValues: IAttributeValuePair[],
): string {
  if (!attributeValues || attributeValues.length === 0) {
    return "DEFAULT";
  }

  return attributeValues
    .map((av) => ({
      attributeId: av.attributeId.toString(),
      attributeValueId: av.attributeValueId.toString(),
    }))
    .sort((a, b) => a.attributeId.localeCompare(b.attributeId))
    .map((av) => `${av.attributeId}:${av.attributeValueId}`)
    .join("|");
}

import { Types } from "mongoose";

export interface RawCombination {
  attributeId: string;
  attributeValueId: string;
}

export function buildVariantKey(attributeValues: RawCombination[]): string {
  return attributeValues
    .sort((a, b) => a.attributeId.localeCompare(b.attributeId))
    .map((v) => `${v.attributeId}:${v.attributeValueId}`)
    .join("|");
}

export function generateVariantsFromCombinations(
  productId: string,
  combinations: RawCombination[][],
) {
  return combinations.map((attrs) => {
    const key = buildVariantKey(attrs);

    return {
      productId: new Types.ObjectId(productId),
      attributeValues: attrs.map((a) => ({
        attributeId: new Types.ObjectId(a.attributeId),
        attributeValueId: new Types.ObjectId(a.attributeValueId),
      })),
      variantKey: key,
    };
  });
}

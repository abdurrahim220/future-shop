import buildVariantKey from "./buildVariantKey";

function generateVariants(
  productId: string,
  allowedCombinations: any[],
  attributeMap: Record<string, string>,
) {
  const variants = [];

  for (const combo of allowedCombinations) {
    const attributeValues = Object.entries(combo).map(
      ([attributeId, attributeValueId]) => ({
        attributeId,
        attributeValueId,
      }),
    );

    const key = buildVariantKey(attributeValues);

    variants.push({
      productId,
      attributeValues,
      key,
      sku: null,
      salePrice: 0,
      purchasePrice: 0,
      images: [],
      isDefault: false,
    });
  }

  return variants;
}

export default generateVariants;

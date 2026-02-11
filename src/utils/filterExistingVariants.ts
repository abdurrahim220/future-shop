async function filterExistingVariants(
  productId: string,
  generatedVariants: any[],
) {
  const existing = await ProductVariant.find({ productId }, { key: 1 }).lean();

  const existingKeys = new Set(existing.map((v) => v.key));

  return generatedVariants.filter((v) => !existingKeys.has(v.key));
}

export default filterExistingVariants;

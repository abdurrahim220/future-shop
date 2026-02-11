function buildVariantKey(
  attributeValues: { attributeId: string; attributeValueId: string }[],
) {
  return attributeValues
    .sort((a, b) => a.attributeId.localeCompare(b.attributeId))
    .map((v) => `${v.attributeId}:${v.attributeValueId}`)
    .join("|");
}

export default buildVariantKey;

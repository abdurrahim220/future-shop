function validateCombinations(combinations: any[], attributes: any[]) {
  const attrIds = attributes.map((a) => a.attributeId);

  for (const combo of combinations) {
    for (const attrId of attrIds) {
      if (!combo[attrId]) {
        throw new Error(`Missing attribute ${attrId} in combination`);
      }
    }
  }
}

export default validateCombinations;

function uniqueVariants(variants: any[]) {
  const map = new Map();

  for (const v of variants) {
    if (!map.has(v.key)) {
      map.set(v.key, v);
    }
  }

  return Array.from(map.values());
}

export default uniqueVariants;

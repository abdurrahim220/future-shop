export const generateSlug = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default generateSlug;

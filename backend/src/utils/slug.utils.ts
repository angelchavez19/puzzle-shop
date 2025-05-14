export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueSlug = (base: string): string => {
  const baseSlug = slugify(base);
  const extra = Date.now().toString(36);
  return `${baseSlug}-${extra}`;
};

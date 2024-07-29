export function generateUniqueCode(prefix: string, length: number): string {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, length + 2)
    .toUpperCase();
  return `${prefix}-${randomPart}`;
}

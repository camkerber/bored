export function cellFontSize(textLength: number): string {
  if (textLength <= 20) return "1rem";
  if (textLength <= 40) return "0.85rem";
  if (textLength <= 50) return "0.7rem";
  return "0.6rem";
}

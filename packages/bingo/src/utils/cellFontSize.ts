export function cellFontSize(textLength: number): string {
  if (textLength <= 20) return "1rem";
  if (textLength <= 50) return "0.85rem";
  return "0.72rem";
}

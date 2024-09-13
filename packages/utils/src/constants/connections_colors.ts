import {CategoryV2} from "../types/connections";

export const COLOR_MAP: Record<"light" | "dark", Record<CategoryV2, string>> = {
  light: {
    [CategoryV2.Yellow]: "#FFD700",
    [CategoryV2.Green]: "success.light",
    [CategoryV2.Blue]: "primary.light",
    [CategoryV2.Purple]: "secondary.light",
  },
  dark: {
    [CategoryV2.Yellow]: "#FFC000",
    [CategoryV2.Green]: "success.main",
    [CategoryV2.Blue]: "primary.main",
    [CategoryV2.Purple]: "secondary.main",
  },
};

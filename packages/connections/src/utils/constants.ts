import {CategoryV2, GameFormField} from "@bored/utils";

export const DEFAULT_GAME_ID = "204";

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

export const CATEGORY_SQUARE_MAP: Record<CategoryV2, string> = {
  [CategoryV2.Yellow]: "\u{1F7E8}",
  [CategoryV2.Green]: "\u{1F7E9}",
  [CategoryV2.Blue]: "\u{1F7E6}",
  [CategoryV2.Purple]: "\u{1F7EA}",
};

export const CATEGORY_FORM_FIELD_NAME_MAP = {
  [CategoryV2.Yellow]: GameFormField.YellowName,
  [CategoryV2.Green]: GameFormField.GreenName,
  [CategoryV2.Blue]: GameFormField.BlueName,
  [CategoryV2.Purple]: GameFormField.PurpleName,
};

export const CATEGORY_FORM_FIELD_OPTIONS_MAP = {
  [CategoryV2.Yellow]: GameFormField.YellowOptions,
  [CategoryV2.Green]: GameFormField.GreenOptions,
  [CategoryV2.Blue]: GameFormField.BlueOptions,
  [CategoryV2.Purple]: GameFormField.PurpleOptions,
};

export const TEXT_FIELD_COLORS: Record<
  CategoryV2,
  "warning" | "success" | "primary" | "secondary"
> = {
  [CategoryV2.Yellow]: "warning",
  [CategoryV2.Green]: "success",
  [CategoryV2.Blue]: "primary",
  [CategoryV2.Purple]: "secondary",
};

export const PREVIEW_GRID_SIZE = 16;

export type OptionPositionMap = {
  [key in CategoryV2]: Record<number, number>;
};

export const OPTION_POSITION_MAP: OptionPositionMap = {
  [CategoryV2.Yellow]: {
    0: 1,
    1: 4,
    2: 10,
    3: 12,
  },
  [CategoryV2.Green]: {
    0: 0,
    1: 3,
    2: 9,
    3: 11,
  },
  [CategoryV2.Blue]: {
    0: 2,
    1: 5,
    2: 8,
    3: 14,
  },
  [CategoryV2.Purple]: {
    0: 15,
    1: 6,
    2: 7,
    3: 13,
  },
};

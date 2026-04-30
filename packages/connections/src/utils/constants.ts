import {Category, GameFormField} from "@bored/utils";

export const DEFAULT_GAME_ID = "204";

export const COLOR_MAP: Record<Category, string> = {
  [Category.Yellow]: "#ffdb58",
  [Category.Green]: "#50c878",
  [Category.Blue]: "#468fea",
  [Category.Purple]: "#b272e0",
};

export const CATEGORY_SQUARE_MAP: Record<Category, string> = {
  [Category.Yellow]: "\u{1F7E8}",
  [Category.Green]: "\u{1F7E9}",
  [Category.Blue]: "\u{1F7E6}",
  [Category.Purple]: "\u{1F7EA}",
};

export const CATEGORY_FORM_FIELD_NAME_MAP = {
  [Category.Yellow]: GameFormField.YellowName,
  [Category.Green]: GameFormField.GreenName,
  [Category.Blue]: GameFormField.BlueName,
  [Category.Purple]: GameFormField.PurpleName,
};

export const CATEGORY_FORM_FIELD_OPTIONS_MAP = {
  [Category.Yellow]: GameFormField.YellowOptions,
  [Category.Green]: GameFormField.GreenOptions,
  [Category.Blue]: GameFormField.BlueOptions,
  [Category.Purple]: GameFormField.PurpleOptions,
};

export const TEXT_FIELD_COLORS: Record<
  Category,
  "warning" | "success" | "primary" | "secondary"
> = {
  [Category.Yellow]: "warning",
  [Category.Green]: "success",
  [Category.Blue]: "primary",
  [Category.Purple]: "secondary",
};

export const PREVIEW_GRID_SIZE = 16;

export type OptionPositionMap = {
  [key in Category]: Record<0 | 1 | 2 | 3, number>;
};

export const OPTION_POSITION_MAP: OptionPositionMap = {
  [Category.Yellow]: {
    0: 1,
    1: 4,
    2: 10,
    3: 12,
  },
  [Category.Green]: {
    0: 0,
    1: 3,
    2: 9,
    3: 11,
  },
  [Category.Blue]: {
    0: 2,
    1: 5,
    2: 8,
    3: 14,
  },
  [Category.Purple]: {
    0: 15,
    1: 6,
    2: 7,
    3: 13,
  },
};

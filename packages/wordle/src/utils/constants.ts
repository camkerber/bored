import {CharGuessStatus} from "@bored/utils";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export const DELETE_STRING = "DEL";
export const DELETE_UNICODE = "\u{21A9}";
export const SUBMIT_STRING = "GUESS";

export const FLIP_STAGGER_MS = 250;
export const FLIP_DURATION_MS = 500;
// Time for the final tile's flip to finish (tiles flip left-to-right).
export const FLIP_TOTAL_MS =
  (WORD_LENGTH - 1) * FLIP_STAGGER_MS + FLIP_DURATION_MS;
// Reveal the results once the flip animation settles, plus a small buffer.
export const RESULTS_REVEAL_DELAY_MS = FLIP_TOTAL_MS + 300;

export const CHAR_STATUS_SQUARE_MAP: Record<CharGuessStatus, string> = {
  [CharGuessStatus.Correct]: "\u{1F7E9}",
  [CharGuessStatus.NotInTheWord]: "\u{2B1C}",
  [CharGuessStatus.WrongPosition]: "\u{1F7E8}",
  [CharGuessStatus.Unguessed]: "",
};

export const KEYBOARD_ROW_1: string[] = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
];
export const KEYBOARD_ROW_2: string[] = [
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
];
export const KEYBOARD_ROW_3: string[] = [
  SUBMIT_STRING,
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  DELETE_STRING,
];

export const ALL_KEYS: string[] = [
  ...KEYBOARD_ROW_1,
  ...KEYBOARD_ROW_2,
  ...KEYBOARD_ROW_3,
];

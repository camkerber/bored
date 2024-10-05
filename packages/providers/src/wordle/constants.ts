import {CharGuessStatus, WordleGame} from "@bored/utils";

export const DELETE_STRING = "DEL";
export const DELETE_UNICODE = "\u{21A9}";
export const SUBMIT_STRING = "GUESS";

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

export const WORDLE_MAP: WordleGame = [
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
  [
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
    {
      character: "",
      status: CharGuessStatus.Unguessed,
    },
  ],
];

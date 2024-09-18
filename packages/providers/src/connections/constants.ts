import {
  CategoryV2,
  CreateGameForm,
  GameFormField,
  GameFormFieldValidity,
} from "@bored/utils";

export const CREATE_GAME_FORM_CONTEXT_DEFAULT: CreateGameForm = {
  formIsValid: false,
  newGame: {
    id: "",
    title: "",
    author: "",
    connections: [
      {
        category: CategoryV2.Yellow,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Green,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Blue,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Purple,
        description: "",
        options: [],
      },
    ],
  },
  updateGameForm: () => {},
  setFormFieldValid: () => {},
  resetForm: () => {},
};

export const FORM_VALIDITY_MAP: GameFormFieldValidity = {
  [GameFormField.Title]: false,
  [GameFormField.Author]: true,
  [GameFormField.YellowName]: false,
  [GameFormField.GreenName]: false,
  [GameFormField.BlueName]: false,
  [GameFormField.PurpleName]: false,
  [GameFormField.YellowOptions]: false,
  [GameFormField.GreenOptions]: false,
  [GameFormField.BlueOptions]: false,
  [GameFormField.PurpleOptions]: false,
};

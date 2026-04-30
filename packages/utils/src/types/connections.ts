export enum Category {
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
}

export interface Connection {
  category: Category;
  description: string;
  options: string[];
}

export interface Game {
  id: string;
  author?: string;
  title: string;
  connections: Connection[];
}

export enum GameFormField {
  Title = "title",
  Author = "author",
  YellowName = "yellow_name",
  GreenName = "green_name",
  BlueName = "blue_name",
  PurpleName = "purple_name",
  YellowOptions = "yellow_options",
  GreenOptions = "green_options",
  BlueOptions = "blue_options",
  PurpleOptions = "purple_options",
}

export enum CreateGameFormActionType {
  ChangeTitle = "change_title",
  ChangeAuthor = "change_author",
  ChangeCategoryName = "change_category_name",
  ChangeCategoryOptions = "change_category_options",
  ResetForm = "reset_form",
}

export interface CreateGameFormActionPayload {
  newTitle?: string;
  newAuthor?: string;
  newCategoryName?: {
    category: Category;
    newName: string;
  };
  newCategoryOptions?: {
    category: Category;
    newOptions: string[];
  };
  resetForm?: boolean;
}

export interface CreateGameFormAction {
  type: CreateGameFormActionType;
  payload: CreateGameFormActionPayload;
}

export type GameFormFieldValidity = {
  [key in GameFormField]: boolean;
};

export type FormResetSignal = "reset" | "static";

export interface CreateGameForm {
  formIsValid: boolean;
  newGame: Game;
  updateGameForm: (action: CreateGameFormAction) => void;
  setFormFieldValid: (isValid: boolean, formField: GameFormField) => void;
  resetForm: () => void;
  formResetSignal: FormResetSignal;
}

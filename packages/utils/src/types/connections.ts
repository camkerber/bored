export enum CategoryV2 {
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
}

export interface ConnectionV2 {
  category: CategoryV2;
  description: string;
  options: string[];
}

export interface GameV2 {
  id: string;
  author?: string;
  title: string;
  connections: ConnectionV2[];
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
}

export interface CreateGameFormActionPayload {
  newTitle?: string;
  newAuthor?: string;
  newCategoryName?: {
    category: CategoryV2;
    newName: string;
  };
  newCategoryOptions?: {
    category: CategoryV2;
    newOptions: string[];
  };
}

export interface CreateGameFormAction {
  type: CreateGameFormActionType;
  payload: CreateGameFormActionPayload;
}

export type GameFormFieldValidity = {
  [key in GameFormField]: boolean;
};

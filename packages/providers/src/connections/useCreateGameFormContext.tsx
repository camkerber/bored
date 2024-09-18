import {createContext, useContext} from "react";
import {CREATE_GAME_FORM_CONTEXT_DEFAULT} from "./constants";

export const CreateGameFormContext = createContext(
  CREATE_GAME_FORM_CONTEXT_DEFAULT,
);

export const useCreateGameFormContext = () => {
  const context = CreateGameFormContext;

  if (!context) {
    throw Error(
      "CreateGameFormContext is undefined. It can only be used within CreateGameFormProvider",
    );
  }

  return useContext(context);
};

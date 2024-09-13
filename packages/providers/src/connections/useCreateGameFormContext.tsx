import {useContext} from "react";
import {CreateGameFormContext} from "./CreateGameFormProvider";

export const useCreateGameFormContext = () => {
  const context = CreateGameFormContext;

  if (!context) {
    throw Error(
      "CreateGameFormContext is undefined. It can only be used within CreateGameFormProvider",
    );
  }

  return useContext(context);
};

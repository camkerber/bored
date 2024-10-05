import {useContext} from "react";
import {WordleContext} from "./WordleProvider";

export const useWordleContext = () => {
  const context = WordleContext;

  if (!context) {
    throw Error(
      "WordleContext is undefined. It can only be used within WordleProvider",
    );
  }

  return useContext(context);
};

import {useContext} from "react";
import {ColorModeContext} from "./ColorMode";

export const useColorModeContext = () => {
  const context = ColorModeContext;

  if (!context) {
    throw Error(
      "ColorModeContext is undefined. It can only be used within ColorModeProvider",
    );
  }

  return useContext(context);
};

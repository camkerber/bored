import {useContext} from "react";
import {FirebaseContext} from "./Firebase";

export const useFirebaseContext = () => {
  const context = FirebaseContext;

  if (!context) {
    throw Error(
      "FirebaseContext is undefined. It can only be used within FirebaseProvider",
    );
  }

  return useContext(context);
};

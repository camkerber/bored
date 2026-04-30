import {useContext} from "react";
import {ConnectionsGameContext} from "./ConnectionsGame";

export const useConnectionsGameContext = () => {
  const context = useContext(ConnectionsGameContext);

  if (!context) {
    throw Error(
      "ConnectionsGameContext is undefined. It can only be used within ConnectionsGameProvider",
    );
  }

  return context;
};

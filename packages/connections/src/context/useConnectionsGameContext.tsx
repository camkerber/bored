import {useContext} from "react";
import {
  ConnectionsGameActionsContext,
  ConnectionsGameStateContext,
} from "./ConnectionsGame";

export const useConnectionsGameState = () => {
  const context = useContext(ConnectionsGameStateContext);

  if (!context) {
    throw Error(
      "ConnectionsGameStateContext is undefined. It can only be used within ConnectionsGameProvider",
    );
  }

  return context;
};

export const useConnectionsGameActions = () => {
  const context = useContext(ConnectionsGameActionsContext);

  if (!context) {
    throw Error(
      "ConnectionsGameActionsContext is undefined. It can only be used within ConnectionsGameProvider",
    );
  }

  return context;
};

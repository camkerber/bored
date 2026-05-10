import {useContext} from "react";
import {WatcherSession, WatcherSessionContext} from "./WatcherSession";

export const useWatcherSessionContext = (): WatcherSession => {
  const ctx = useContext(WatcherSessionContext);
  if (!ctx) {
    throw new Error(
      "useWatcherSessionContext must be used within a WatcherSessionProvider",
    );
  }
  return ctx;
};

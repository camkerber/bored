import {useContext} from "react";
import {
  WatcherLiveState,
  WatcherLiveStateContext,
  WatcherSession,
  WatcherSessionContext,
} from "./contexts";

export const useWatcherSession = (): WatcherSession => {
  const ctx = useContext(WatcherSessionContext);
  if (!ctx) {
    throw new Error(
      "useWatcherSession must be used within a WatcherSessionProvider",
    );
  }
  return ctx;
};

export const useWatcherLiveState = (): WatcherLiveState => {
  const ctx = useContext(WatcherLiveStateContext);
  if (!ctx) {
    throw new Error(
      "useWatcherLiveState must be used within a WatcherSessionProvider",
    );
  }
  return ctx;
};

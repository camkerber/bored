import {createContext} from "react";
import {ParticipantSlot, SessionMode, SessionState} from "../utils/types";

// Stable session identity + actions. Changes only when the participant starts,
// joins, or resets a session — not on every poll tick.
export interface WatcherSession {
  sessionId: string | undefined;
  code: string | undefined;
  participantToken: string | undefined;
  slot: ParticipantSlot | undefined;
  mode: SessionMode | undefined;
  refreshState: () => Promise<unknown>;
  startSession: (mode: SessionMode) => Promise<void>;
  joinSession: (code: string) => Promise<void>;
  reset: () => void;
}

// Volatile polled session state. Split into its own context so screens that
// only need identity/actions (e.g. SessionForm) don't re-render on poll updates.
export interface WatcherLiveState {
  state: SessionState | undefined;
  isStateLoading: boolean;
  stateError: Error | undefined;
}

export const WatcherSessionContext = createContext<WatcherSession | undefined>(
  undefined,
);

export const WatcherLiveStateContext = createContext<
  WatcherLiveState | undefined
>(undefined);

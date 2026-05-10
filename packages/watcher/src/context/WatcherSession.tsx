import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  createWatcherSession,
  joinWatcherSession,
  useWatcherSessionState,
} from "@bored/api";
import {ParticipantSlot, SessionMode, SessionState} from "../utils/types";

export interface WatcherSession {
  sessionId: string | undefined;
  code: string | undefined;
  participantToken: string | undefined;
  slot: ParticipantSlot | undefined;
  mode: SessionMode | undefined;
  state: SessionState | undefined;
  isStateLoading: boolean;
  stateError: Error | undefined;
  refreshState: () => Promise<unknown>;
  startSession: (mode: SessionMode) => Promise<void>;
  joinSession: (code: string) => Promise<void>;
  reset: () => void;
}

export const WatcherSessionContext = createContext<WatcherSession | undefined>(
  undefined,
);

export const WatcherSessionProvider = ({children}: PropsWithChildren) => {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [participantToken, setParticipantToken] = useState<
    string | undefined
  >();
  const [slot, setSlot] = useState<ParticipantSlot | undefined>();
  const [mode, setMode] = useState<SessionMode | undefined>();

  const {
    data: state,
    isLoading: isStateLoading,
    error: stateError,
    refetch: refreshState,
  } = useWatcherSessionState(sessionId, participantToken);

  const startSession = useCallback(async (selectedMode: SessionMode) => {
    const result = await createWatcherSession(selectedMode);
    setSessionId(result.sessionId);
    setCode(result.code);
    setParticipantToken(result.participantToken);
    setSlot("p1");
    setMode(selectedMode);
  }, []);

  const joinSession = useCallback(async (joinCode: string) => {
    const result = await joinWatcherSession(joinCode);
    setSessionId(result.sessionId);
    setCode(result.state.code);
    setParticipantToken(result.participantToken);
    setSlot("p2");
    setMode(result.state.mode);
  }, []);

  const reset = useCallback(() => {
    setSessionId(undefined);
    setCode(undefined);
    setParticipantToken(undefined);
    setSlot(undefined);
    setMode(undefined);
  }, []);

  const value = useMemo<WatcherSession>(
    () => ({
      sessionId,
      code,
      participantToken,
      slot,
      mode: state?.mode ?? mode,
      state,
      isStateLoading,
      stateError: stateError ?? undefined,
      refreshState,
      startSession,
      joinSession,
      reset,
    }),
    [
      sessionId,
      code,
      participantToken,
      slot,
      mode,
      state,
      isStateLoading,
      stateError,
      refreshState,
      startSession,
      joinSession,
      reset,
    ],
  );

  return (
    <WatcherSessionContext.Provider value={value}>
      {children}
    </WatcherSessionContext.Provider>
  );
};

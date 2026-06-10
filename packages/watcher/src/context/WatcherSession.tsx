import {PropsWithChildren, useState} from "react";
import {
  createWatcherSession,
  joinWatcherSession,
  useWatcherSessionState,
} from "@bored/api";
import {ParticipantSlot, SessionMode} from "../utils/types";
import {
  WatcherLiveState,
  WatcherLiveStateContext,
  WatcherSession,
  WatcherSessionContext,
} from "./contexts";

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

  const startSession = async (selectedMode: SessionMode) => {
    const result = await createWatcherSession(selectedMode);
    setSessionId(result.sessionId);
    setCode(result.code);
    setParticipantToken(result.participantToken);
    setSlot("p1");
    setMode(selectedMode);
  };

  const joinSession = async (joinCode: string) => {
    const result = await joinWatcherSession(joinCode);
    setSessionId(result.sessionId);
    setCode(result.state.code);
    setParticipantToken(result.participantToken);
    setSlot("p2");
    setMode(result.state.mode);
  };

  const reset = () => {
    setSessionId(undefined);
    setCode(undefined);
    setParticipantToken(undefined);
    setSlot(undefined);
    setMode(undefined);
  };

  // The session mode is immutable once set, so the locally tracked value is
  // authoritative — keeping it out of the live state keeps this object stable.
  const session: WatcherSession = {
    sessionId,
    code,
    participantToken,
    slot,
    mode,
    refreshState,
    startSession,
    joinSession,
    reset,
  };

  const liveState: WatcherLiveState = {
    state,
    isStateLoading,
    stateError: stateError ?? undefined,
  };

  return (
    <WatcherSessionContext.Provider value={session}>
      <WatcherLiveStateContext.Provider value={liveState}>
        {children}
      </WatcherLiveStateContext.Provider>
    </WatcherSessionContext.Provider>
  );
};

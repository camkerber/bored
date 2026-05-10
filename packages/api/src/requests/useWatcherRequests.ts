import useSWR from "swr";
import {
  apiGetWithHeaders,
  apiPost,
  apiPut,
  withParticipantToken,
} from "../apiClient";
import {useApiPollingQuery} from "./useApiPollingQuery";

export type WatcherSessionMode = "solo-entry" | "dual-entry";

export type WatcherSessionStatus =
  | "waiting-for-partner"
  | "form"
  | "matching"
  | "results";

export interface WatcherMovieShow {
  id: string;
  title: string;
  description?: string;
  service?: string;
}

export interface WatcherPublicParticipant {
  present: boolean;
  formReady: boolean;
  swipesDone: boolean;
  entryCount: number;
}

export interface WatcherSessionState {
  sessionId: string;
  code: string;
  mode: WatcherSessionMode;
  status: WatcherSessionStatus;
  rounds: number;
  expiresAt: string;
  participants: {
    p1: WatcherPublicParticipant;
    p2: WatcherPublicParticipant;
  };
}

export interface CreateWatcherSessionResult {
  sessionId: string;
  code: string;
  participantToken: string;
}

export interface JoinWatcherSessionResult {
  sessionId: string;
  participantToken: string;
  state: WatcherSessionState;
}

export type RematchMode = "narrow" | "retry";

export const createWatcherSession = (mode: WatcherSessionMode) =>
  apiPost<CreateWatcherSessionResult>("/api/watcher/sessions", {mode});

export const joinWatcherSession = (code: string) =>
  apiPost<JoinWatcherSessionResult>(
    `/api/watcher/sessions/${encodeURIComponent(code)}/join`,
  );

export const submitWatcherEntries = (
  sessionId: string,
  token: string,
  entries: WatcherMovieShow[],
) =>
  apiPut<WatcherSessionState>(
    `/api/watcher/sessions/${sessionId}/entries`,
    {entries},
    withParticipantToken(token),
  );

export const markWatcherReady = (sessionId: string, token: string) =>
  apiPost<WatcherSessionState>(
    `/api/watcher/sessions/${sessionId}/ready`,
    undefined,
    withParticipantToken(token),
  );

export const submitWatcherSwipes = (
  sessionId: string,
  token: string,
  likes: string[],
  dislikes: string[],
) =>
  apiPost<WatcherSessionState>(
    `/api/watcher/sessions/${sessionId}/swipes`,
    {likes, dislikes},
    withParticipantToken(token),
  );

export const requestWatcherRematch = (
  sessionId: string,
  token: string,
  mode: RematchMode,
) =>
  apiPost<WatcherSessionState>(
    `/api/watcher/sessions/${sessionId}/rematch`,
    {mode},
    withParticipantToken(token),
  );

export const useWatcherSessionState = (
  sessionId: string | undefined,
  token: string | undefined,
) =>
  useApiPollingQuery<WatcherSessionState>({
    path: sessionId ? `/api/watcher/sessions/${sessionId}` : null,
    headers: token ? withParticipantToken(token) : undefined,
    enabled: !!sessionId && !!token,
  });

export const useWatcherDeck = (
  sessionId: string | undefined,
  token: string | undefined,
  enabled: boolean,
) => {
  const path =
    sessionId && enabled ? `/api/watcher/sessions/${sessionId}/entries` : null;
  const headers = token ? withParticipantToken(token) : undefined;
  const {data, mutate, error, isLoading} = useSWR<
    {entries: WatcherMovieShow[]},
    Error
  >(
    path && headers ? ["watcher-deck", path] : null,
    () => apiGetWithHeaders<{entries: WatcherMovieShow[]}>(path!, headers!),
    {revalidateOnFocus: false},
  );
  return {data, refetch: mutate, error, isLoading};
};

export const useWatcherMatches = (
  sessionId: string | undefined,
  token: string | undefined,
  enabled: boolean,
) => {
  const path =
    sessionId && enabled ? `/api/watcher/sessions/${sessionId}/matches` : null;
  const headers = token ? withParticipantToken(token) : undefined;
  const {data, mutate, error, isLoading} = useSWR<{matches: string[]}, Error>(
    path && headers ? ["watcher-matches", path] : null,
    () => apiGetWithHeaders<{matches: string[]}>(path!, headers!),
    {revalidateOnFocus: false},
  );
  return {data, refetch: mutate, error, isLoading};
};

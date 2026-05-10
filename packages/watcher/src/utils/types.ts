export type {
  WatcherMovieShow as MovieShow,
  WatcherSessionMode as SessionMode,
  WatcherSessionStatus as SessionStatus,
  WatcherSessionState as SessionState,
  WatcherPublicParticipant as PublicParticipant,
  CreateWatcherSessionResult as CreateSessionResult,
  JoinWatcherSessionResult as JoinSessionResult,
  RematchMode,
} from "@bored/api";

export type ParticipantSlot = "p1" | "p2";

export type UiPhase =
  | "landing"
  | "mode-picker"
  | "join"
  | "waiting-for-partner"
  | "form"
  | "waiting-for-form"
  | "matching"
  | "waiting-for-swipes"
  | "results";

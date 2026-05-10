import {ParticipantSlot, SessionState, UiPhase} from "./types";

export interface DerivePhaseArgs {
  state: SessionState | undefined;
  slot: ParticipantSlot | undefined;
}

export const derivePhase = ({state, slot}: DerivePhaseArgs): UiPhase => {
  if (!state || !slot) return "landing";

  const me = state.participants[slot];
  const partner = state.participants[slot === "p1" ? "p2" : "p1"];

  switch (state.status) {
    case "results":
      return "results";

    case "matching":
      if (me.swipesDone && !partner.swipesDone) return "waiting-for-swipes";
      return "matching";

    case "form":
      if (state.mode === "solo-entry" && slot === "p2") {
        return "waiting-for-form";
      }
      if (me.formReady) return "waiting-for-form";
      return "form";

    case "waiting-for-partner":
      if (state.mode === "solo-entry" && slot === "p1" && !me.formReady) {
        return "form";
      }
      return "waiting-for-partner";

    default:
      return "landing";
  }
};

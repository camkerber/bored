import {lazy, Suspense, useState} from "react";
import {Alert, Box, CircularProgress, Container} from "@mui/material";
import {
  WatcherSessionProvider,
  useWatcherLiveState,
  useWatcherSession,
} from "../context";
import {derivePhase} from "../utils/phase";
import {Landing} from "./Landing";
import {ModePicker} from "./ModePicker";
import {JoinForm} from "./JoinForm";
import {WaitingForPartner} from "./WaitingForPartner";

// Heavier, later-phase screens are split out so framer-motion (MatchingDeck via
// SwipeCard) and react-hook-form (SessionForm) load only when their phase is hit.
const SessionForm = lazy(() =>
  import("./SessionForm").then((m) => ({default: m.SessionForm})),
);
const MatchingDeck = lazy(() =>
  import("./MatchingDeck").then((m) => ({default: m.MatchingDeck})),
);
const Results = lazy(() =>
  import("./Results").then((m) => ({default: m.Results})),
);

const CenteredSpinner = () => (
  <Box sx={{display: "flex", justifyContent: "center", mt: 6}}>
    <CircularProgress />
  </Box>
);

type LandingChoice = "none" | "start" | "join";

const WatcherInner = () => {
  const {slot, code, sessionId} = useWatcherSession();
  const {state, isStateLoading, stateError} = useWatcherLiveState();
  const [choice, setChoice] = useState<LandingChoice>("none");

  if (!sessionId) {
    if (choice === "start")
      return <ModePicker onCancel={() => setChoice("none")} />;
    if (choice === "join")
      return <JoinForm onCancel={() => setChoice("none")} />;
    return (
      <Landing
        onStart={() => setChoice("start")}
        onJoin={() => setChoice("join")}
      />
    );
  }

  if (!state) {
    if (stateError) {
      return (
        <Box sx={{mt: 6, px: 2, maxWidth: 420, mx: "auto"}}>
          <Alert severity="error">{stateError.message}</Alert>
        </Box>
      );
    }
    if (isStateLoading) {
      return <CenteredSpinner />;
    }
    return null;
  }

  const phase = derivePhase({state, slot});

  switch (phase) {
    case "form":
      return <SessionForm waiting={false} />;

    case "waiting-for-form":
      if (state.mode === "solo-entry" && slot === "p1") {
        return (
          <WaitingForPartner
            title="Share your code"
            message="Send this code to your partner. The session will start as soon as they join."
            shareCode={code}
          />
        );
      }
      if (state.mode === "solo-entry" && slot === "p2") {
        return (
          <WaitingForPartner
            title="Hang tight"
            message="Your partner is finalizing the list. We'll start swiping in a moment."
          />
        );
      }
      return <SessionForm waiting={true} />;

    case "waiting-for-partner":
      return (
        <WaitingForPartner
          title="Waiting for your partner"
          message="Share the code below. Once they join, we'll get started."
          shareCode={code}
        />
      );

    case "matching":
      return <MatchingDeck />;

    case "waiting-for-swipes":
      return (
        <WaitingForPartner
          title="Waiting on your partner's picks"
          message="They're still swiping. We'll show your matches as soon as they're done."
        />
      );

    case "results":
      return <Results />;

    case "landing":
    default:
      return (
        <Landing
          onStart={() => setChoice("start")}
          onJoin={() => setChoice("join")}
        />
      );
  }
};

export const Watcher = () => (
  <Container maxWidth="md" sx={{py: 2}}>
    <WatcherSessionProvider>
      <Suspense fallback={<CenteredSpinner />}>
        <WatcherInner />
      </Suspense>
    </WatcherSessionProvider>
  </Container>
);

import {useReducer, useState} from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import {submitWatcherSwipes, useWatcherDeck} from "@bored/api";
import {useWatcherLiveState, useWatcherSession} from "../context";
import {MovieShow} from "../utils/types";
import {SwipeCard, SwipeDecision} from "./SwipeCard";

type SubmitState =
  | {kind: "idle"}
  | {kind: "submitting"}
  | {kind: "error"; message: string; likes: string[]; dislikes: string[]}
  | {kind: "submitted"};

interface DeckState {
  index: number;
  likes: string[];
  dislikes: string[];
  flash: SwipeDecision | null;
}

type DeckAction =
  | {type: "decide"; decision: SwipeDecision; id: string}
  | {type: "advance"};

const INITIAL_DECK_STATE: DeckState = {
  index: 0,
  likes: [],
  dislikes: [],
  flash: null,
};

function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case "decide":
      if (state.flash) return state;
      return {
        ...state,
        likes:
          action.decision === "like"
            ? [...state.likes, action.id]
            : state.likes,
        dislikes:
          action.decision === "dislike"
            ? [...state.dislikes, action.id]
            : state.dislikes,
        flash: action.decision,
      };
    case "advance":
      return {...state, index: state.index + 1, flash: null};
  }
}

interface DeckRoundProps {
  entries: MovieShow[];
  sessionId: string;
  participantToken: string;
  onSubmitted: () => Promise<unknown>;
}

const DeckRound = ({
  entries,
  sessionId,
  participantToken,
  onSubmitted,
}: DeckRoundProps) => {
  const [{index, likes, dislikes, flash}, dispatch] = useReducer(
    deckReducer,
    INITIAL_DECK_STATE,
  );
  const [submitState, setSubmitState] = useState<SubmitState>({kind: "idle"});

  const send = (likesNow: string[], dislikesNow: string[]) => {
    if (submitState.kind === "submitting" || submitState.kind === "submitted") {
      return;
    }
    setSubmitState({kind: "submitting"});
    submitWatcherSwipes(sessionId, participantToken, likesNow, dislikesNow)
      .then(() => onSubmitted())
      .then(() => setSubmitState({kind: "submitted"}))
      .catch((e: unknown) => {
        setSubmitState({
          kind: "error",
          message: e instanceof Error ? e.message : "Could not submit swipes",
          likes: likesNow,
          dislikes: dislikesNow,
        });
      });
  };

  const decide = (decision: SwipeDecision) => {
    if (flash || index >= entries.length) return;
    dispatch({type: "decide", decision, id: entries[index].id});
  };

  const handleDismissed = () => {
    const isLast = index + 1 >= entries.length;
    dispatch({type: "advance"});
    if (isLast) {
      send(likes, dislikes);
    }
  };

  const finished = index >= entries.length;

  if (finished) {
    return (
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          mt: 6,
          px: 2,
        }}
      >
        {submitState.kind === "submitting" ? <CircularProgress /> : null}
        <Typography variant="h6">
          {submitState.kind === "submitting"
            ? "Submitting your picks..."
            : "Picks submitted! Waiting for results..."}
        </Typography>
        {submitState.kind === "error" ? (
          <Alert severity="error">
            {submitState.message}
            <Button
              sx={{ml: 1}}
              size="small"
              onClick={() => send(submitState.likes, submitState.dislikes)}
            >
              Retry
            </Button>
          </Alert>
        ) : null}
      </Stack>
    );
  }

  const current = entries[index];
  return (
    <Box sx={{mt: 4, px: 2, pb: 6}}>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "text.secondary",
          }}
        >
          {index + 1} of {entries.length}
        </Typography>
        <SwipeCard
          key={current.id}
          entry={current}
          onDecide={decide}
          onDismissed={handleDismissed}
          flash={flash}
        />
        <Stack direction="row" spacing={4} sx={{mt: 1}}>
          <IconButton
            aria-label="Dislike"
            color="error"
            size="large"
            onClick={() => decide("dislike")}
            disabled={!!flash}
            sx={{border: 1, borderColor: "error.main"}}
          >
            <ThumbDownIcon />
          </IconButton>
          <IconButton
            aria-label="Like"
            color="success"
            size="large"
            onClick={() => decide("like")}
            disabled={!!flash}
            sx={{border: 1, borderColor: "success.main"}}
          >
            <ThumbUpIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export const MatchingDeck = () => {
  const {sessionId, participantToken, refreshState} = useWatcherSession();
  const {state} = useWatcherLiveState();
  const round = state?.rounds ?? 1;

  const {data, isLoading, error} = useWatcherDeck(
    sessionId,
    participantToken,
    !!sessionId && !!participantToken,
  );

  const entries = data?.entries ?? [];

  if (isLoading) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", mt: 6}}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{mt: 4, mx: "auto", maxWidth: 420}}>
        <Alert severity="error">
          {error instanceof Error ? error.message : "Could not load deck"}
        </Alert>
      </Box>
    );
  }
  if (entries.length === 0) {
    return (
      <Box sx={{mt: 4, mx: "auto", maxWidth: 420}}>
        <Alert severity="warning">No entries to swipe through.</Alert>
      </Box>
    );
  }
  if (!sessionId || !participantToken) {
    return null;
  }

  return (
    <DeckRound
      key={round}
      entries={entries}
      sessionId={sessionId}
      participantToken={participantToken}
      onSubmitted={() => refreshState()}
    />
  );
};

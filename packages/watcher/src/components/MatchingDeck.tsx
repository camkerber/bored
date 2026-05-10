import {useMemo, useState} from "react";
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
import {useWatcherSessionContext} from "../context";
import {MovieShow} from "../utils/types";
import {SwipeCard, SwipeDecision} from "./SwipeCard";

type SubmitState =
  | {kind: "idle"}
  | {kind: "submitting"}
  | {kind: "error"; message: string; likes: string[]; dislikes: string[]}
  | {kind: "submitted"};

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
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [flash, setFlash] = useState<SwipeDecision | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({kind: "idle"});

  const send = (likesNow: string[], dislikesNow: string[]) => {
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
    const current = entries[index];
    const nextLikes = decision === "like" ? [...likes, current.id] : likes;
    const nextDislikes =
      decision === "dislike" ? [...dislikes, current.id] : dislikes;
    setLikes(nextLikes);
    setDislikes(nextDislikes);
    setFlash(decision);
    const nextIndex = index + 1;
    setTimeout(() => {
      setFlash(null);
      setIndex(nextIndex);
      if (nextIndex >= entries.length) {
        send(nextLikes, nextDislikes);
      }
    }, 220);
  };

  const finished = index >= entries.length;

  if (finished) {
    return (
      <Stack spacing={2} alignItems="center" sx={{mt: 6, px: 2}}>
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
      <Stack spacing={2} alignItems="center">
        <Typography variant="overline" color="text.secondary">
          {index + 1} of {entries.length}
        </Typography>
        <SwipeCard entry={current} onDecide={decide} flash={flash} />
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
  const {sessionId, participantToken, state, refreshState} =
    useWatcherSessionContext();
  const round = state?.rounds ?? 1;

  const {data, isLoading, error} = useWatcherDeck(
    sessionId,
    participantToken,
    !!sessionId && !!participantToken,
  );

  const entries = useMemo(() => data?.entries ?? [], [data]);

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

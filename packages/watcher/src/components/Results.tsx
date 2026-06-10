import {useState, useTransition} from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  requestWatcherRematch,
  useWatcherDeck,
  useWatcherMatches,
} from "@bored/api";
import {useWatcherLiveState, useWatcherSession} from "../context";

export const Results = () => {
  const {sessionId, participantToken, refreshState} = useWatcherSession();
  const {state} = useWatcherLiveState();

  const {
    data: matchesData,
    isLoading: matchesLoading,
    error: matchesError,
  } = useWatcherMatches(sessionId, participantToken, !!state);
  const {data: deckData} = useWatcherDeck(sessionId, participantToken, !!state);

  const matchedIds = new Set(matchesData?.matches ?? []);
  const matchedEntries =
    deckData?.entries.filter((e) => matchedIds.has(e.id)) ?? [];

  const [submitting, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRematch = (mode: "narrow" | "retry") => {
    if (!sessionId || !participantToken) return;
    setError(null);
    startTransition(async () => {
      try {
        await requestWatcherRematch(sessionId, participantToken, mode);
        await refreshState();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not rematch");
      }
    });
  };

  if (matchesLoading) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", mt: 6}}>
        <CircularProgress />
      </Box>
    );
  }

  if (matchesError) {
    return (
      <Box sx={{mt: 4, mx: "auto", maxWidth: 420}}>
        <Alert severity="error">
          {matchesError instanceof Error
            ? matchesError.message
            : "Could not load matches"}
        </Alert>
      </Box>
    );
  }

  const count = matchedEntries.length;

  return (
    <Box sx={{mt: 4, mx: "auto", maxWidth: 560, px: 2, pb: 6}}>
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        {count === 1 ? (
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography variant="h5">It&apos;s a match!</Typography>
            <Card elevation={4} sx={{width: "100%", borderRadius: 3}}>
              <CardContent sx={{p: 3}}>
                <Typography variant="h4" component="div">
                  {matchedEntries[0].title}
                </Typography>
                {matchedEntries[0].service ? (
                  <Chip
                    label={matchedEntries[0].service}
                    size="small"
                    sx={{mt: 1}}
                  />
                ) : null}
                {matchedEntries[0].description ? (
                  <Typography variant="body1" sx={{mt: 2}}>
                    {matchedEntries[0].description}
                  </Typography>
                ) : null}
              </CardContent>
            </Card>
          </Stack>
        ) : count > 1 ? (
          <Stack spacing={2}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              You both liked {count} options
            </Typography>
            <Stack spacing={1.5}>
              {matchedEntries.map((entry) => (
                <Card key={entry.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{entry.title}</Typography>
                    {entry.service ? (
                      <Chip label={entry.service} size="small" sx={{mt: 0.5}} />
                    ) : null}
                    {entry.description ? (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mt: 1,
                        }}
                      >
                        {entry.description}
                      </Typography>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleRematch("narrow")}
              disabled={submitting}
            >
              Narrow it down
            </Button>
          </Stack>
        ) : (
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography variant="h5">No matches</Typography>
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              Looks like you both need to be a little less picky. Want another
              pass?
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleRematch("retry")}
              disabled={submitting}
            >
              Try again
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

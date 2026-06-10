import {useState, useTransition} from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import {SessionMode} from "../utils/types";
import {useWatcherSession} from "../context";

export interface ModePickerProps {
  onCancel: () => void;
}

export const ModePicker = ({onCancel}: ModePickerProps) => {
  const {startSession} = useWatcherSession();
  const [submitting, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handlePick = (mode: SessionMode) => {
    setError(null);
    startTransition(async () => {
      try {
        await startSession(mode);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to start session");
      }
    });
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
      <Stack spacing={3} sx={{width: "100%", maxWidth: 480}}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Who&apos;s adding movies/shows?
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card variant="outlined">
          <CardActionArea
            disabled={submitting}
            onClick={() => handlePick("dual-entry")}
          >
            <CardContent>
              <Typography variant="h6">Both of us</Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                Each person adds 1–5 options. You&apos;ll get a code right away
                to share.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card variant="outlined">
          <CardActionArea
            disabled={submitting}
            onClick={() => handlePick("solo-entry")}
          >
            <CardContent>
              <Typography variant="h6">Just me</Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                You add 2–10 options now. Share the code afterwards so your
                partner can join straight to swiping.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Button onClick={onCancel} disabled={submitting}>
          Back
        </Button>
      </Stack>
    </Box>
  );
};

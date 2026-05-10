import {useState} from "react";
import {Alert, Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useWatcherSessionContext} from "../context";

export interface JoinFormProps {
  onCancel: () => void;
}

export const JoinForm = ({onCancel}: JoinFormProps) => {
  const {joinSession} = useWatcherSessionContext();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\d{5}$/.test(code)) {
      setError("Enter the 5-digit code from your partner");
      return;
    }
    setSubmitting(true);
    try {
      await joinSession(code);
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Could not join session");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        spacing={3}
        sx={{width: "100%", maxWidth: 360}}
      >
        <Typography variant="h5" component="h2" textAlign="center">
          Join a session
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <TextField
          label="5-digit code"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 5))
          }
          inputProps={{inputMode: "numeric", pattern: "[0-9]*", maxLength: 5}}
          autoFocus
          fullWidth
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || code.length !== 5}
          >
            Join
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

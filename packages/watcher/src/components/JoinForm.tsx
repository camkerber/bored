import {useActionState, useState} from "react";
import {Alert, Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useWatcherSession} from "../context";

export interface JoinFormProps {
  onCancel: () => void;
}

interface JoinState {
  error: string | null;
}

const INITIAL_STATE: JoinState = {error: null};

export const JoinForm = ({onCancel}: JoinFormProps) => {
  const {joinSession} = useWatcherSession();
  const [code, setCode] = useState("");

  const [state, formAction, isPending] = useActionState<JoinState, FormData>(
    async (_prev, formData) => {
      const raw = formData.get("code");
      const value = typeof raw === "string" ? raw : "";
      if (!/^\d{5}$/.test(value)) {
        return {error: "Enter the 5-digit code from your partner"};
      }
      try {
        await joinSession(value);
        return {error: null};
      } catch (e) {
        return {
          error: e instanceof Error ? e.message : "Could not join session",
        };
      }
    },
    INITIAL_STATE,
  );

  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
      <Stack
        component="form"
        action={formAction}
        spacing={3}
        sx={{width: "100%", maxWidth: 360}}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Join a session
        </Typography>
        {state.error ? <Alert severity="error">{state.error}</Alert> : null}
        <TextField
          label="5-digit code"
          name="code"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 5))
          }
          autoFocus
          fullWidth
          slotProps={{
            htmlInput: {inputMode: "numeric", pattern: "[0-9]*", maxLength: 5},
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending || code.length !== 5}
          >
            Join
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

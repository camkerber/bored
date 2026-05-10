import {Box, Button, Stack, Typography} from "@mui/material";

export interface LandingProps {
  onStart: () => void;
  onJoin: () => void;
}

export const Landing = ({onStart, onJoin}: LandingProps) => (
  <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
    <Stack spacing={3} sx={{width: "100%", maxWidth: 420, textAlign: "center"}}>
      <Typography variant="h4" component="h1">
        What are we watching?
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Pick a movie or show together. Start a session and share the code, or
        join a session your partner already started.
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" size="large" onClick={onStart}>
          Start a session
        </Button>
        <Button variant="outlined" size="large" onClick={onJoin}>
          Join a session
        </Button>
      </Stack>
    </Stack>
  </Box>
);

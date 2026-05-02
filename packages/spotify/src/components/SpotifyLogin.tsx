import {Box, Button, Stack, Typography} from "@mui/material";
import {useSpotifyAuth} from "../context";

export const SpotifyLogin = () => {
  const {login, isInitializing} = useSpotifyAuth();

  return (
    <Box sx={{display: "flex", justifyContent: "center", py: 6}}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">Your Spotify Charts</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Sign in with Spotify to see your top artists.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={login}
          disabled={isInitializing}
        >
          Sign in with Spotify
        </Button>
      </Stack>
    </Box>
  );
};

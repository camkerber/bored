import {Box, CircularProgress} from "@mui/material";
import {SpotifyAuthProvider} from "../SpotifyAuthProvider";
import {useSpotifyAuth} from "../useSpotifyAuth";
import {SpotifyLogin} from "./SpotifyLogin";
import {TopItemsView} from "./TopItemsView";

const SpotifyContent = () => {
  const {isAuthenticated, isInitializing} = useSpotifyAuth();

  if (isInitializing) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", py: 8}}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <TopItemsView /> : <SpotifyLogin />;
};

export const Spotify = () => (
  <SpotifyAuthProvider>
    <SpotifyContent />
  </SpotifyAuthProvider>
);

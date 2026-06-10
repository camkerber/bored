import {Box, CircularProgress} from "@mui/material";
import {preloadSpotifyTopArtists} from "@bored/api";
import {Suspense, use, useEffect} from "react";
import {getValidAccessToken, loadTokens} from "../auth";
import {SpotifyAuthProvider, useSpotifyAuth} from "../context";
import {SpotifyLogin} from "./SpotifyLogin";
import {TopItemsView} from "./TopItemsView";

const AuthFallback = () => (
  <Box sx={{display: "flex", justifyContent: "center", py: 8}}>
    <CircularProgress />
  </Box>
);

const SpotifyContent = () => {
  const {authPromise} = useSpotifyAuth();
  const isAuthenticated = use(authPromise);
  return isAuthenticated ? <TopItemsView /> : <SpotifyLogin />;
};

export const Spotify = () => {
  useEffect(() => {
    // Warm the default chart (artists / medium_term) in parallel with the auth
    // refresh so it isn't gated behind it once the user is authenticated.
    if (loadTokens()) {
      void preloadSpotifyTopArtists({
        timeRange: "medium_term",
        getAccessToken: getValidAccessToken,
      });
    }
  }, []);

  return (
    <SpotifyAuthProvider>
      <Suspense fallback={<AuthFallback />}>
        <SpotifyContent />
      </Suspense>
    </SpotifyAuthProvider>
  );
};

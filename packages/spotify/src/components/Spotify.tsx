import {Box, CircularProgress} from "@mui/material";
import {Suspense, use} from "react";
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

export const Spotify = () => (
  <SpotifyAuthProvider>
    <Suspense fallback={<AuthFallback />}>
      <SpotifyContent />
    </Suspense>
  </SpotifyAuthProvider>
);

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type {SpotifyTimeRange, SpotifyTopItemKind} from "@bored/utils";
import {Suspense, useState} from "react";
import {useSpotifyAuth} from "../context";
import {ErrorBoundary} from "./ErrorBoundary";
import {TimeRangeToggle} from "./TimeRangeToggle";
import {TopArtistsList} from "./TopArtistsList";
import {TopTracksList} from "./TopTracksList";

const SuspenseFallback = () => (
  <Box sx={{display: "flex", justifyContent: "center", py: 6}}>
    <CircularProgress />
  </Box>
);

export const TopItemsView = () => {
  const {logout} = useSpotifyAuth();
  const [kind, setKind] = useState<SpotifyTopItemKind>("artists");
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("medium_term");

  return (
    <Box sx={{py: 2}}>
      <Stack
        direction={{xs: "column", sm: "row"}}
        spacing={2}
        sx={{
          alignItems: {xs: "flex-start", sm: "center"},
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">Your Spotify Charts</Typography>
        <Button onClick={logout} size="small">
          Sign out
        </Button>
      </Stack>
      <Tabs
        value={kind}
        onChange={(_, next: SpotifyTopItemKind) => setKind(next)}
        sx={{mb: 2}}
      >
        <Tab value="artists" label="Artists" />
        <Tab value="tracks" label="Songs" />
      </Tabs>
      <Box sx={{mb: 3}}>
        <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
      </Box>
      <ErrorBoundary
        resetKeys={[kind, timeRange]}
        fallback={(reset) => (
          <Stack spacing={2} sx={{alignItems: "center", py: 6}}>
            <Typography variant="body2" sx={{color: "text.secondary"}}>
              Couldn&apos;t load your Spotify charts.
            </Typography>
            <Button onClick={reset} size="small" variant="outlined">
              Try again
            </Button>
          </Stack>
        )}
      >
        <Suspense fallback={<SuspenseFallback />}>
          {kind === "artists" ? (
            <TopArtistsList timeRange={timeRange} />
          ) : (
            <TopTracksList timeRange={timeRange} />
          )}
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

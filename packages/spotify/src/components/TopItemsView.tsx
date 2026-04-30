import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {SpotifyTimeRange, SpotifyTopItemKind} from "@bored/utils";
import {Suspense, useState} from "react";
import {useSpotifyAuth} from "../useSpotifyAuth";
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
        alignItems={{xs: "flex-start", sm: "center"}}
        justifyContent="space-between"
        sx={{mb: 2}}
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

      <Suspense fallback={<SuspenseFallback />}>
        {kind === "artists" ? (
          <TopArtistsList timeRange={timeRange} />
        ) : (
          <TopTracksList timeRange={timeRange} />
        )}
      </Suspense>
    </Box>
  );
};

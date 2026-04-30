import {Box, Typography} from "@mui/material";
import {SpotifyTimeRange} from "@bored/utils";
import {useGetSpotifyTopTracks} from "@bored/api";
import {useSpotifyAuth} from "../useSpotifyAuth";
import {TrackCard} from "./TrackCard";

interface TopTracksListProps {
  timeRange: SpotifyTimeRange;
  limit?: number;
}

export const TopTracksList = ({
  timeRange,
  limit = 20,
}: TopTracksListProps) => {
  const {getValidAccessToken, isAuthenticated} = useSpotifyAuth();
  const {data} = useGetSpotifyTopTracks({
    timeRange,
    limit,
    enabled: isAuthenticated,
    getAccessToken: getValidAccessToken,
  });

  if (!data?.items.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
        No top songs found for this time range yet.
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {data.items.map((track, index) => (
          <TrackCard key={track.id} track={track} rank={index + 1} />
        ))}
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{display: "block", mt: 3, textAlign: "center"}}
      >
        Powered by Spotify
      </Typography>
    </Box>
  );
};

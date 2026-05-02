import {Box, Typography} from "@mui/material";
import {SpotifyTimeRange} from "@bored/utils";
import {useGetSpotifyTopArtists} from "@bored/api";
import {useSpotifyAuth} from "../context";
import {ArtistCard} from "./ArtistCard";

interface TopArtistsListProps {
  timeRange: SpotifyTimeRange;
  limit?: number;
}

export const TopArtistsList = ({
  timeRange,
  limit = 20,
}: TopArtistsListProps) => {
  const {getValidAccessToken, isAuthenticated} = useSpotifyAuth();
  const {data} = useGetSpotifyTopArtists({
    timeRange,
    limit,
    enabled: isAuthenticated,
    getAccessToken: getValidAccessToken,
  });

  if (!data?.items.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{mt: 4}}>
        No top artists found for this time range yet.
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
        {data.items.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} rank={index + 1} />
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

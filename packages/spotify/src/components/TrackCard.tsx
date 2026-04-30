import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {SpotifyTrack} from "@bored/utils";

interface TrackCardProps {
  track: SpotifyTrack;
  rank: number;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'/>";

export const TrackCard = ({track, rank}: TrackCardProps) => {
  const imageUrl = track.album.images?.[0]?.url ?? FALLBACK_IMAGE;
  const artistNames = track.artists.map((a) => a.name).join(", ");

  return (
    <Card elevation={2} sx={{height: "100%"}}>
      <CardActionArea
        onClick={() => window.open(track.external_urls.spotify, "_blank")}
        sx={{height: "100%"}}
      >
        <Box sx={{position: "relative"}}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={track.name}
            sx={{aspectRatio: "1 / 1", objectFit: "cover"}}
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "background.paper",
              color: "text.primary",
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            #{rank}
          </Box>
        </Box>
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {track.name}
          </Typography>
          {artistNames ? (
            <Typography variant="caption" color="text.secondary" noWrap>
              {artistNames}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

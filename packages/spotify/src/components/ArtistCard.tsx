import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {SpotifyArtist} from "@bored/utils";

interface ArtistCardProps {
  artist: SpotifyArtist;
  rank: number;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'/>";

export const ArtistCard = ({artist, rank}: ArtistCardProps) => {
  const imageUrl = artist.images?.[0]?.url ?? FALLBACK_IMAGE;
  const topGenre = artist.genres?.[0];

  return (
    <Card elevation={1} sx={{height: "100%"}}>
      <CardActionArea
        onClick={() => window.open(artist.external_urls.spotify, "_blank")}
        sx={{height: "100%"}}
      >
        <Box sx={{position: "relative"}}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={artist.name}
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
            {artist.name}
          </Typography>
          {topGenre ? (
            <Typography variant="caption" color="text.secondary" noWrap>
              {topGenre}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

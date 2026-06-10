import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface MediaRankCardProps {
  rank: number;
  name: string;
  imageUrl?: string;
  subtitle?: string;
  externalUrl: string;
  elevation?: number;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'/>";

export const MediaRankCard = ({
  rank,
  name,
  imageUrl,
  subtitle,
  externalUrl,
  elevation = 1,
}: MediaRankCardProps) => (
  <Card elevation={elevation} sx={{height: "100%"}}>
    <CardActionArea
      component="a"
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{height: "100%"}}
    >
      <Box sx={{position: "relative"}}>
        <CardMedia
          component="img"
          image={imageUrl ?? FALLBACK_IMAGE}
          alt={name}
          loading="lazy"
          decoding="async"
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
          {name}
        </Typography>
        {subtitle ? (
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "text.secondary",
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </CardContent>
    </CardActionArea>
  </Card>
);

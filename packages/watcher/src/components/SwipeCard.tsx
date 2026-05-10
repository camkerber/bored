import {motion, PanInfo, useMotionValue, useTransform} from "framer-motion";
import {Box, Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import {MovieShow} from "../utils/types";

export type SwipeDecision = "like" | "dislike";

export interface SwipeCardProps {
  entry: MovieShow;
  onDecide: (decision: SwipeDecision) => void;
  flash: SwipeDecision | null;
}

const SWIPE_THRESHOLD = 120;

export const SwipeCard = ({entry, onDecide, flash}: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const dislikeOpacity = useTransform(x, [-140, -40], [1, 0]);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onDecide("like");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onDecide("dislike");
    } else {
      x.set(0);
    }
  };

  return (
    <Box sx={{position: "relative", width: "100%", maxWidth: 360, mx: "auto"}}>
      <motion.div
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        onDragEnd={handleDragEnd}
        style={{x, rotate, touchAction: "pan-y"}}
        animate={
          flash === "like"
            ? {x: 600, opacity: 0}
            : flash === "dislike"
              ? {x: -600, opacity: 0}
              : undefined
        }
        transition={{type: "spring", stiffness: 220, damping: 24}}
      >
        <Card elevation={4} sx={{minHeight: 360, borderRadius: 3}}>
          <CardContent
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: 360,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{wordBreak: "break-word"}}
            >
              {entry.title}
            </Typography>
            {entry.service ? (
              <Chip
                label={entry.service}
                size="small"
                sx={{alignSelf: "flex-start"}}
              />
            ) : null}
            {entry.description ? (
              <Typography variant="body1" color="text.secondary">
                {entry.description}
              </Typography>
            ) : null}
          </CardContent>
        </Card>
        <motion.div
          style={{
            opacity: likeOpacity,
            position: "absolute",
            top: 24,
            right: 24,
            border: "3px solid #2e7d32",
            color: "#2e7d32",
            padding: "4px 12px",
            borderRadius: 6,
            fontWeight: 700,
            transform: "rotate(8deg)",
          }}
        >
          LIKE
        </motion.div>
        <motion.div
          style={{
            opacity: dislikeOpacity,
            position: "absolute",
            top: 24,
            left: 24,
            border: "3px solid #c62828",
            color: "#c62828",
            padding: "4px 12px",
            borderRadius: 6,
            fontWeight: 700,
            transform: "rotate(-8deg)",
          }}
        >
          NOPE
        </motion.div>
      </motion.div>
      <Stack direction="row" justifyContent="center" sx={{mt: 2}} spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Swipe left to skip · swipe right to like
        </Typography>
      </Stack>
    </Box>
  );
};

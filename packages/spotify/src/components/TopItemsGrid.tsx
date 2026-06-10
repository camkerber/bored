import {Box, Typography} from "@mui/material";
import type {ReactNode} from "react";

interface TopItemsGridProps<T> {
  items: T[];
  emptyMessage: string;
  renderItem: (item: T, index: number) => ReactNode;
}

export const TopItemsGrid = <T,>({
  items,
  emptyMessage,
  renderItem,
}: TopItemsGridProps<T>) => {
  if (!items.length) {
    return (
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mt: 4,
        }}
      >
        {emptyMessage}
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
        {items.map(renderItem)}
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mt: 3,
          textAlign: "center",
        }}
      >
        Powered by Spotify
      </Typography>
    </Box>
  );
};

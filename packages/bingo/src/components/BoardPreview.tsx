import {memo} from "react";
import {Box} from "@mui/material";
import {BingoCell} from "./BingoCell";
import {
  BOARD_SIZE,
  FREE_SPACE_INDEX,
  FREE_SPACE_SENTINEL,
} from "../utils/constants";

interface BoardPreviewProps {
  cells: string[];
  marks?: ReadonlySet<number>;
  hasFreeSpace?: boolean;
  onCellClick?: (index: number) => void;
}

export const BoardPreview = memo(function BoardPreview({
  cells,
  marks,
  hasFreeSpace = false,
  onCellClick,
}: BoardPreviewProps) {
  return (
    <Box
      role="grid"
      aria-label="Bingo board"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: "1px",
        padding: "1px",
        backgroundColor: "divider",
        width: "100%",
        minWidth: 280,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      {Array.from({length: BOARD_SIZE}, (_, idx) => {
        const isFree = hasFreeSpace && idx === FREE_SPACE_INDEX;
        const value = isFree ? FREE_SPACE_SENTINEL : (cells[idx] ?? "");
        return (
          <BingoCell
            key={idx}
            value={value}
            freeSpace={isFree}
            marked={marks?.has(idx) ?? false}
            onClick={onCellClick ? () => onCellClick(idx) : undefined}
          />
        );
      })}
    </Box>
  );
});

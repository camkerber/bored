import {Container, Stack, Typography} from "@mui/material";
import {BoardPreview} from "./BoardPreview";
import {ShareBingoBoardButton} from "./ShareBingoBoardButton";

interface InteractiveBoardViewProps {
  cells: string[];
  marks: ReadonlySet<number>;
  hasFreeSpace: boolean;
  onCellClick: (index: number) => void;
  onShare: () => void;
  shareNote: string | null;
}

export const InteractiveBoardView = ({
  cells,
  marks,
  hasFreeSpace,
  onCellClick,
  onShare,
  shareNote,
}: InteractiveBoardViewProps) => (
  <Container maxWidth="md" sx={{pb: 3}} disableGutters>
    <Stack
      spacing={3}
      sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
    >
      <Typography variant="h4" component="h1" sx={{textAlign: "center"}}>
        Your bingo board
      </Typography>
      <BoardPreview
        cells={cells}
        marks={marks}
        hasFreeSpace={hasFreeSpace}
        onCellClick={onCellClick}
      />
      <ShareBingoBoardButton onShare={onShare} note={shareNote} />
      <Typography
        variant="caption"
        sx={{textAlign: "center", color: "text.secondary"}}
      >
        When the shared link is opened a fresh board is created.
      </Typography>
    </Stack>
  </Container>
);

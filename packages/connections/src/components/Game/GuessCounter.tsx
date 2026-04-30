import CircleIcon from "@mui/icons-material/Circle";
import {Box, Typography} from "@mui/material";

interface GuessCounterProps {
  incorrectGuessCount: number;
}

export const GuessCounter = ({incorrectGuessCount}: GuessCounterProps) => {
  return (
    <Box sx={{mt: 3, gap: 1}} className="flex-center">
      <Typography variant="body1">Mistakes remaining:</Typography>
      {Array.from({length: Math.max(0, 4 - incorrectGuessCount)}).map(
        (_, index) => (
          <CircleIcon key={index} color="action" />
        ),
      )}
    </Box>
  );
};

import CircleIcon from "@mui/icons-material/Circle";
import {Box, Typography} from "@mui/material";
import "@bored/styles";

interface GuessCounterProps {
  incorrectGuessCount: number;
}

const GuessCounter = ({incorrectGuessCount}: GuessCounterProps) => {
  return (
    <Box sx={{mt: 4, gap: 1}} className="connections-guess-counter">
      <Typography variant="body1">Mistakes remaining:</Typography>
      {Array.from(Array(4 - incorrectGuessCount)).map((_, index) => (
        <CircleIcon key={index} color="action" />
      ))}
    </Box>
  );
};

export default GuessCounter;

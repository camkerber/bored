import {Paper, Typography, useTheme} from "@mui/material";
import type {Theme} from "@mui/material";
import {CharGuessStatus, WordleCharacter} from "@bored/utils";

const STATUS_BG: Record<CharGuessStatus, (t: Theme) => string> = {
  [CharGuessStatus.Correct]: (t) => t.palette.success.main,
  [CharGuessStatus.WrongPosition]: (t) => t.palette.warning.light,
  [CharGuessStatus.NotInTheWord]: (t) => t.palette.text.disabled,
  [CharGuessStatus.Unguessed]: (t) => t.palette.grey[300],
};

interface CharInputProps {
  charObj: WordleCharacter;
}

export const CharInput = ({charObj}: CharInputProps) => {
  const theme = useTheme();
  const backgroundColor = STATUS_BG[charObj.status](theme);

  return (
    <Paper
      className="wordle-tile"
      elevation={0}
      sx={{
        backgroundColor,
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {charObj.character.toUpperCase()}
      </Typography>
    </Paper>
  );
};

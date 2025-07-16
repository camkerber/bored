import {Paper, Typography, useTheme} from "@mui/material";
import {CharGuessStatus, WordleCharacter} from "@bored/utils";
import {useMemo} from "react";

interface CharInputProps {
  charObj: WordleCharacter;
}

export const CharInput = ({charObj}: CharInputProps) => {
  const theme = useTheme();

  const backgroundColor = useMemo(() => {
    if (charObj.status === CharGuessStatus.Correct) {
      return theme.palette.success.main;
    } else if (charObj.status === CharGuessStatus.WrongPosition) {
      return theme.palette.warning.light;
    } else if (charObj.status === CharGuessStatus.NotInTheWord) {
      return theme.palette.text.disabled;
    } else {
      return theme.palette.grey[300];
    }
  }, [charObj.status, theme]);

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

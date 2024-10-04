import {Paper, Typography, useTheme} from "@mui/material";
import {useColorModeContext} from "@bored/providers";
import {CharGuessStatus, WordleCharacter} from "../utils";
import {useMemo} from "react";

interface CharInputProps {
  charObj: WordleCharacter;
}

export const CharInput = ({charObj}: CharInputProps) => {
  const theme = useTheme();
  const {mode} = useColorModeContext();

  const backgroundColor = useMemo(() => {
    if (charObj.status === CharGuessStatus.Correct) {
      return theme.palette.success.main;
    } else if (charObj.status === CharGuessStatus.WrongPosition) {
      return theme.palette.warning.light;
    } else if (charObj.status === CharGuessStatus.NotInTheWord) {
      return theme.palette.text.disabled;
    } else {
      return mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[900];
    }
  }, [charObj.status, mode, theme]);

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

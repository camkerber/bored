import {Button} from "@mui/material";
import {DELETE_STRING, DELETE_UNICODE} from "../utils";

interface KeyboardRowProps {
  keyboardRow: string[];
  onNewChar: (char: string) => void;
  gameCompleted: boolean;
  charsNotInWord: string[];
}

export const KeyboardRow = ({
  keyboardRow,
  onNewChar,
  gameCompleted,
  charsNotInWord,
}: KeyboardRowProps) => {
  return (
    <div className="keyboard-row">
      {keyboardRow.map((char) => (
        <Button
          key={char}
          className="keyboard-char"
          variant="contained"
          color="inherit"
          disableElevation
          size="small"
          onClick={() => onNewChar(char)}
          disabled={gameCompleted}
          sx={{
            backgroundColor: (theme) =>
              charsNotInWord.includes(char)
                ? theme.palette.action.disabledBackground
                : undefined,
            color: (theme) =>
              charsNotInWord.includes(char)
                ? theme.palette.action.disabled
                : undefined,
          }}
        >
          {char === DELETE_STRING ? DELETE_UNICODE : char}
        </Button>
      ))}
    </div>
  );
};

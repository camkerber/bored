import {Button} from "@mui/material";
import {
  DELETE_STRING,
  DELETE_UNICODE,
  useWordleContext,
} from "@bored/providers";

interface KeyboardRowProps {
  keyboardRow: string[];
}

export const KeyboardRow = ({keyboardRow}: KeyboardRowProps) => {
  const {handleNewChar, gameCompleted, charsNotInWord} = useWordleContext();

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
          onClick={() => handleNewChar(char)}
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

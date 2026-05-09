import {Paper, Typography, useTheme} from "@mui/material";
import type {Theme} from "@mui/material";
import {CharGuessStatus, WordleCharacter} from "@bored/utils";
import {CSSProperties, useLayoutEffect, useRef, useState} from "react";

const STATUS_BG: Record<CharGuessStatus, (t: Theme) => string> = {
  [CharGuessStatus.Correct]: (t) => t.palette.success.main,
  [CharGuessStatus.WrongPosition]: (t) => t.palette.warning.light,
  [CharGuessStatus.NotInTheWord]: (t) => t.palette.text.disabled,
  [CharGuessStatus.Unguessed]: (t) => t.palette.grey[300],
};

const FLIP_STAGGER_MS = 250;
const FLIP_DURATION_MS = 500;

interface CharInputProps {
  charObj: WordleCharacter;
  charIndex: number;
}

export const CharInput = ({charObj, charIndex}: CharInputProps) => {
  const theme = useTheme();
  const finalBg = STATUS_BG[charObj.status](theme);
  const unguessedBg = STATUS_BG[CharGuessStatus.Unguessed](theme);

  const prevStatusRef = useRef(charObj.status);
  const [flipping, setFlipping] = useState(false);

  useLayoutEffect(() => {
    const wasUnguessed = prevStatusRef.current === CharGuessStatus.Unguessed;
    prevStatusRef.current = charObj.status;

    if (!wasUnguessed || charObj.status === CharGuessStatus.Unguessed) return;

    setFlipping(true);
    const total = charIndex * FLIP_STAGGER_MS + FLIP_DURATION_MS;
    const t = setTimeout(() => setFlipping(false), total);
    return () => clearTimeout(t);
  }, [charObj.status, charIndex]);

  const flipStyle: CSSProperties = flipping
    ? ({
        "--flip-delay": `${charIndex * FLIP_STAGGER_MS}ms`,
        "--flip-initial-bg": unguessedBg,
        "--flip-final-bg": finalBg,
      } as CSSProperties)
    : {};

  return (
    <Paper
      className={`wordle-tile${flipping ? " wordle-tile-flipping" : ""}`}
      elevation={0}
      style={flipStyle}
      sx={{
        backgroundColor: flipping ? unguessedBg : finalBg,
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

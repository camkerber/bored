import {generateId} from "@bored/utils";
import {CharInput} from "./CharInput";
import {Grid2} from "@mui/material";
import {useWordleContext} from "@bored/providers";

export const GuessBoard = () => {
  const {guesses} = useWordleContext();

  return (
    <div className="wordle-guess-board-container">
      {guesses.map((guessRow) => (
        <Grid2
          key={generateId() + Math.random()}
          container
          spacing={1}
          columns={5}
          mb={1}
        >
          {guessRow.map((char) => (
            <Grid2 key={generateId() + Math.random()} size={1}>
              <CharInput charObj={char}></CharInput>
            </Grid2>
          ))}
        </Grid2>
      ))}
    </div>
  );
};

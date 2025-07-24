import {generateId} from "@bored/utils";
import {CharInput} from "./CharInput";
import {useWordleContext} from "@bored/providers";
import React from "react";

export const GuessBoard = () => {
  const {guesses} = useWordleContext();

  return (
    <div className="wordle-game-board">
      {guesses.map((guessRow) => (
        <React.Fragment key={generateId() + Math.random()}>
          {guessRow.map((char) => (
            <CharInput key={generateId() + Math.random()} charObj={char} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

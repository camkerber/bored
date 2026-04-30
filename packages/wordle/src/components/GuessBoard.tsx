import {CharInput} from "./CharInput";
import {useWordleContext} from "@bored/providers";
import React from "react";

export const GuessBoard = () => {
  const {guesses} = useWordleContext();

  return (
    <div className="wordle-game-board">
      {guesses.map((guessRow, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {guessRow.map((char, charIndex) => (
            <CharInput key={charIndex} charObj={char} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

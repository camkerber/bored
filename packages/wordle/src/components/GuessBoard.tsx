import {CharInput} from "./CharInput";
import {useWordleContext} from "../context";
import React from "react";

export const GuessBoard = () => {
  const {guesses} = useWordleContext();

  return (
    <div className="wordle-game-board">
      {guesses.map((guessRow, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {guessRow.map((char, charIndex) => (
            <CharInput key={charIndex} charObj={char} charIndex={charIndex} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

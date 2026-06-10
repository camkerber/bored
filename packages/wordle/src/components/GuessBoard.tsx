import {CharInput} from "./CharInput";
import {useWordleContext} from "../context";
import {Fragment} from "react";

export const GuessBoard = () => {
  const {guesses} = useWordleContext();

  return (
    <div className="wordle-game-board">
      {guesses.map((guessRow, rowIndex) => (
        <Fragment key={rowIndex}>
          {guessRow.map((char, charIndex) => (
            <CharInput key={charIndex} charObj={char} charIndex={charIndex} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

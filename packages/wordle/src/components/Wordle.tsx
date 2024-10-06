import {GuessBoard} from "./GuessBoard";
import {Keyboard} from "./Keyboard";
import {ResultsModal} from "./ResultsModal";
import {Actions} from "./Actions";

export const Wordle = () => {
  return (
    <>
      <GuessBoard />
      <Keyboard />
      <ResultsModal />
      <Actions />
    </>
  );
};

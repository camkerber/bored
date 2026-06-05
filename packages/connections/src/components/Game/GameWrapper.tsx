import {useState} from "react";
import {useConnectionsGameState} from "../../context";
import {Actions} from "./Actions";
import {Board} from "./Board";
import {GuessCounter} from "./GuessCounter";
import {ShareResultsModal} from "./ShareResultsModal";

export const GameWrapper = () => {
  const {incorrectGuessCount, gameCompleted} = useConnectionsGameState();
  const [resultsDismissed, setResultsDismissed] = useState(false);
  const showShareResults = gameCompleted && !resultsDismissed;

  const openShareResults = () => setResultsDismissed(false);
  const closeShareResults = () => setResultsDismissed(true);

  return (
    <>
      <Board />
      <GuessCounter incorrectGuessCount={incorrectGuessCount} />
      <Actions onShareResults={openShareResults} />
      <ShareResultsModal open={showShareResults} onClose={closeShareResults} />
    </>
  );
};

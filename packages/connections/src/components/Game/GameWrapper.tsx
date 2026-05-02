import {useCallback} from "react";
import {useConnectionsGameContext} from "../../context";
import {Actions} from "./Actions";
import {Board} from "./Board";
import {GuessCounter} from "./GuessCounter";
import {ShareResultsModal} from "./ShareResultsModal";

export const GameWrapper = () => {
  const {showShareResultsModal, setShowShareResultsModal, incorrectGuessCount} =
    useConnectionsGameContext();

  const openShareResults = useCallback(
    () => setShowShareResultsModal(true),
    [setShowShareResultsModal],
  );
  const closeShareResults = useCallback(
    () => setShowShareResultsModal(false),
    [setShowShareResultsModal],
  );

  return (
    <>
      <Board />
      <GuessCounter incorrectGuessCount={incorrectGuessCount} />
      <Actions onShareResults={openShareResults} />
      <ShareResultsModal
        open={showShareResultsModal}
        onClose={closeShareResults}
      />
    </>
  );
};

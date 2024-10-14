import {useConnectionsGameContext} from "@bored/providers";
import {Actions} from "./Actions";
import {Board} from "./Board";
import {GuessCounter} from "./GuessCounter";
import {ShareResultsModal} from "./ShareResultsModal";

export const GameWrapper = () => {
  const {showShareResultsModal, setShowShareResultsModal, incorrectGuessCount} =
    useConnectionsGameContext();

  return (
    <>
      <Board />
      <GuessCounter incorrectGuessCount={incorrectGuessCount} />
      <Actions onShareResults={() => setShowShareResultsModal(true)} />
      <ShareResultsModal
        open={showShareResultsModal}
        onClose={() => setShowShareResultsModal(false)}
      />
    </>
  );
};

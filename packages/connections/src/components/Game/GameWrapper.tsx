import {useConnectionsGameContext} from "@bored/providers";
import Actions from "./Actions";
import Board from "./Board";
import GuessCounter from "./GuessCounter";
import ShareResultsModal from "./ShareResultsModal";

interface GameWrapperProps {
  onGetNewGame: () => Promise<void>;
}

const GameWrapper = ({onGetNewGame}: GameWrapperProps) => {
  const {showShareResultsModal, setShowShareResultsModal, incorrectGuessCount} =
    useConnectionsGameContext();

  return (
    <>
      <Board />
      <GuessCounter incorrectGuessCount={incorrectGuessCount} />
      <Actions
        onGetNewGame={onGetNewGame}
        onShareResults={() => setShowShareResultsModal(true)}
      />
      <ShareResultsModal
        open={showShareResultsModal}
        onClose={() => setShowShareResultsModal(false)}
      />
    </>
  );
};

export default GameWrapper;

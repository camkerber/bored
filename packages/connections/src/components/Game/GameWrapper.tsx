import {
  ConnectionsGameProvider,
  useConnectionsGameContext,
} from "@bored/providers";
import Actions from "./Actions";
import {Board} from "./Board";
import GuessCounter from "./GuessCounter";
import ShareResultsModal from "./ShareResultsModal";
import {GameV2} from "@bored/utils";

interface GameWrapperProps {
  game: GameV2;
  onGetNewGame: () => Promise<void>;
}

const GameWrapper = ({game, onGetNewGame}: GameWrapperProps) => {
  const {showShareResultsModal, setShowShareResultsModal, incorrectGuessCount} =
    useConnectionsGameContext();

  return (
    <ConnectionsGameProvider game={game}>
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
    </ConnectionsGameProvider>
  );
};

export default GameWrapper;

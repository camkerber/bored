import {GuessBoard} from "./GuessBoard";
import {Keyboard} from "./Keyboard";
import {Button} from "@mui/material";
import {ResultsModal} from "./ResultsModal";
import {useWordleContext} from "@bored/providers";

export const Wordle = () => {
  const {
    gameCompleted,
    openResultsModal,
    setOpenResultsModal,
    handleGetNewWord,
  } = useWordleContext();

  return (
    <>
      <GuessBoard />
      <Keyboard />
      <ResultsModal
        open={openResultsModal}
        onClose={() => setOpenResultsModal(false)}
      />
      {gameCompleted ? (
        <Button
          size="large"
          variant="outlined"
          sx={{mb: 3}}
          onClick={handleGetNewWord}
        >
          New Game
        </Button>
      ) : null}
    </>
  );
};

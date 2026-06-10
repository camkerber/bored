import {Modal} from "@bored/ui";
import {CharGuessStatus} from "@bored/utils";
import {Button, Typography} from "@mui/material";
import {isMobile} from "react-device-detect";
import {useWordleContext} from "../context";
import {useWordleShare} from "../hooks";
import {CHAR_STATUS_SQUARE_MAP} from "../utils";

export const ResultsModal = () => {
  const {
    guesses,
    handleGetNewWord,
    wordToGuess,
    wordleDict,
    openResultsModal,
    setOpenResultsModal,
  } = useWordleContext();
  const share = useWordleShare();

  const squares = guesses
    .flatMap((row) => {
      if (row.some((c) => c.status === CharGuessStatus.Unguessed)) return [];
      return [...row.map((c) => CHAR_STATUS_SQUARE_MAP[c.status]), "\n"];
    })
    .join("")
    .trimEnd();

  const resultsString = `Wordle #${wordleDict[wordToGuess.toLowerCase()]}\n${squares}`;

  const handleShare = () => share({text: resultsString});

  return (
    <Modal
      open={openResultsModal}
      onClose={() => setOpenResultsModal(false)}
      showCloseButton
    >
      <>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
          }}
        >
          Wordle Completed!
        </Typography>
        <pre id="wordle-results" className="share-results-content">
          {resultsString}
        </pre>
        <Button onClick={handleShare} variant="outlined" sx={{mt: 2}}>
          {isMobile ? "Share" : "Copy results"}
        </Button>
        <Button
          variant="outlined"
          sx={{mt: 2}}
          onClick={() => {
            handleGetNewWord();
            setOpenResultsModal(false);
          }}
        >
          New Game
        </Button>
      </>
    </Modal>
  );
};

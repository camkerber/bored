import {Modal} from "@bored/ui";
import {shareLinkOrText, CharGuessStatus} from "@bored/utils";
import {Button, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {isMobile} from "react-device-detect";
import {useMemo} from "react";
import {useWordleContext, CHAR_STATUS_SQUARE_MAP} from "@bored/providers";

interface ResultsModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResultsModal = ({open, onClose}: ResultsModalProps) => {
  const {guesses, handleGetNewWord, wordToGuess, wordleDict} =
    useWordleContext();
  const {enqueueSnackbar} = useSnackbar();

  const resultsString = useMemo(() => {
    let completed = false;
    const allGuesses = [];
    for (let i = 0; i < guesses.length; i++) {
      for (let j = 0; j < guesses[i].length; j++) {
        const charStatus = guesses[i][j].status;
        if (charStatus === CharGuessStatus.Unguessed) {
          completed = true;
          break;
        }

        allGuesses.push(CHAR_STATUS_SQUARE_MAP[charStatus]);
        const position = j + 1;
        if (position % 5 === 0 && position !== guesses.length) {
          allGuesses.push("\n");
        }
      }
      if (completed) {
        break;
      }
    }
    return `Wordle #${wordleDict[wordToGuess.toLowerCase()]}\n${allGuesses.join("")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses, open]);

  const handleShare = async () => {
    await shareLinkOrText(
      {
        text: resultsString,
      },
      () =>
        enqueueSnackbar("Results copied", {
          variant: "success",
        }),
      () =>
        enqueueSnackbar("Failed to copy results", {
          variant: "error",
        }),
    );
  };

  return (
    <Modal open={open} onClose={onClose} showCloseButton>
      <>
        <Typography variant="h6" mb={2}>
          Wordle Completed!
        </Typography>
        <pre id="camnections-results" className="share-results-content">
          {resultsString}
        </pre>
        <Button onClick={handleShare} variant="outlined" sx={{mt: 2}}>
          {isMobile ? "Share" : "Copy to clipboard"}
        </Button>
        <Button
          variant="outlined"
          sx={{mt: 2}}
          onClick={() => {
            handleGetNewWord();
            onClose();
          }}
        >
          New Game
        </Button>
      </>
    </Modal>
  );
};

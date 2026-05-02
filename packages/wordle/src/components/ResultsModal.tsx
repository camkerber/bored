import {Modal} from "@bored/ui";
import {shareLinkOrText, CharGuessStatus} from "@bored/utils";
import {Button, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {isMobile} from "react-device-detect";
import {useWordleContext} from "../context";
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
  const {enqueueSnackbar} = useSnackbar();

  const squares = guesses
    .flatMap((row) => {
      if (row.some((c) => c.status === CharGuessStatus.Unguessed)) return [];
      return [...row.map((c) => CHAR_STATUS_SQUARE_MAP[c.status]), "\n"];
    })
    .join("")
    .trimEnd();

  const resultsString = `Wordle #${wordleDict[wordToGuess.toLowerCase()]}\n${squares}`;

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
    <Modal
      open={openResultsModal}
      onClose={() => setOpenResultsModal(false)}
      showCloseButton
    >
      <>
        <Typography variant="h6" mb={2}>
          Wordle Completed!
        </Typography>
        <pre id="camnections-results" className="share-results-content">
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

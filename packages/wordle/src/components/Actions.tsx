import {useWordleContext} from "@bored/providers";
import {shareLinkOrText} from "@bored/utils";
import {Button, Container} from "@mui/material";
import {useSnackbar} from "notistack";

export const Actions = () => {
  const {
    gameCompleted,
    openResultsModal,
    handleGetNewWord,
    wordToGuess,
    wordleDict,
  } = useWordleContext();
  const {enqueueSnackbar} = useSnackbar();

  const handleShare = async () => {
    await shareLinkOrText(
      {
        title: "Cam is bored",
        text: `Wordle #${wordleDict[wordToGuess.toLowerCase()]}`,
        url: window.location.href,
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
    <>
      {gameCompleted && !openResultsModal ? (
        <Container
          disableGutters
          className="flex-center"
          sx={{flexDirection: "column"}}
        >
          <Button
            size="large"
            variant="outlined"
            sx={{mb: 2, mt: 1}}
            onClick={handleGetNewWord}
          >
            New Game
          </Button>
          <Button
            size="large"
            variant="outlined"
            sx={{mb: 3}}
            onClick={handleShare}
          >
            Share this wordle
          </Button>
        </Container>
      ) : null}
    </>
  );
};

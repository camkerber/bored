import {useWordleContext} from "../context";
import {getCompletedWordles, shareLinkOrText} from "@bored/utils";
import {Button, Container, Typography} from "@mui/material";
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
  const completedGames = getCompletedWordles();

  const showNewGameButton =
    (gameCompleted && !openResultsModal) ||
    completedGames.includes(wordToGuess);
  const showShareButton = gameCompleted && !openResultsModal;

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
      <Container
        disableGutters
        className="flex-center"
        sx={{flexDirection: "column"}}
      >
        {showNewGameButton ? (
          <>
            <Typography mb={1}>You completed this wordle</Typography>
            <Button
              size="large"
              variant="outlined"
              sx={{mb: 2, mt: 1}}
              onClick={handleGetNewWord}
              color="secondary"
            >
              New Game
            </Button>
          </>
        ) : null}
        {showShareButton ? (
          <Button
            size="large"
            variant="outlined"
            sx={{mb: 3}}
            onClick={handleShare}
            color="secondary"
          >
            Share this wordle
          </Button>
        ) : null}
      </Container>
    </>
  );
};

import {useWordleContext} from "../context";
import {useWordleShare} from "../hooks";
import {Button, Container, Typography} from "@mui/material";

export const Actions = () => {
  const {
    gameCompleted,
    currentWordCompleted,
    openResultsModal,
    handleGetNewWord,
    wordToGuess,
    wordleDict,
  } = useWordleContext();
  const share = useWordleShare();

  const showNewGameButton =
    (gameCompleted && !openResultsModal) || currentWordCompleted;
  const showShareButton = gameCompleted && !openResultsModal;

  const handleShare = () =>
    share({
      title: "Cam is bored",
      text: `Wordle #${wordleDict[wordToGuess.toLowerCase()]}`,
      url: window.location.href,
    });

  return (
    <>
      <Container
        disableGutters
        className="flex-center"
        sx={{flexDirection: "column"}}
      >
        {showNewGameButton ? (
          <>
            <Typography
              sx={{
                mb: 1,
              }}
            >
              You completed this wordle
            </Typography>
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

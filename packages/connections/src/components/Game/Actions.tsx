import {Button, Grid} from "@mui/material";
import {useState} from "react";
import {useConnectionsGameContext} from "@bored/providers";
import {shareLinkOrText, useNavigateToConnectionsPath} from "@bored/utils";
import "@bored/styles";
import {useSnackbar} from "notistack";

interface ActionsProps {
  onShareResults: () => void;
  onGetNewGame: () => Promise<void>;
}

const Actions = ({onShareResults, onGetNewGame}: ActionsProps) => {
  const {
    submit,
    shuffleOptions,
    selectionsComplete,
    gameCompleted,
    activeGame,
  } = useConnectionsGameContext();

  const [pauseNewGameButton, setPauseNewGameButton] = useState(false);
  const navigateTo = useNavigateToConnectionsPath();
  const {enqueueSnackbar} = useSnackbar();

  const handleGetNewGame = async () => {
    setPauseNewGameButton(true);
    await onGetNewGame();
    setTimeout(() => {
      setPauseNewGameButton(false);
    }, 3_000);
  };

  const handleShareGame = async () => {
    await shareLinkOrText(
      {
        title: "Cam is bored: Connections",
        text: activeGame.title,
        url: window.location.href,
      },
      () =>
        enqueueSnackbar("Link copied to clipboard", {
          variant: "success",
        }),
      () =>
        enqueueSnackbar("Failed to copy link. Please try again.", {
          variant: "error",
        }),
    );
  };

  return (
    <>
      <Grid
        container
        sx={{mt: 3, mb: 4}}
        spacing={1}
        rowGap={2}
        className="connections-actions-container"
      >
        <Grid item xs={12} className="connections-action-button-container">
          <Button
            onClick={submit}
            variant="contained"
            size="large"
            className="connections-submit-button"
            disabled={!selectionsComplete || gameCompleted}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={shuffleOptions}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={gameCompleted}
          >
            Shuffle
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={onShareResults}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={!gameCompleted}
          >
            View Results
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={handleGetNewGame}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={pauseNewGameButton}
          >
            Random Game
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={handleShareGame}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={pauseNewGameButton}
          >
            Share This Game
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={() => navigateTo("create")}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Create a Game
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={() => navigateTo("archive")}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Game Archives
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;

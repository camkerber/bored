import {Button, Grid} from "@mui/material";
import {useConnectionsGameContext} from "@bored/providers";
import {shareLinkOrText, useNavigateToConnectionsPath} from "@bored/utils";
import "@bored/styles";
import {useSnackbar} from "notistack";

interface ActionsProps {
  onShareResults: () => void;
}

const Actions = ({onShareResults}: ActionsProps) => {
  const {
    submit,
    shuffleOptions,
    selectionsComplete,
    gameCompleted,
    activeGame,
  } = useConnectionsGameContext();

  const navigateTo = useNavigateToConnectionsPath();
  const {enqueueSnackbar} = useSnackbar();

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
        sx={{mt: 2, mb: 4}}
        spacing={1}
        rowGap={2}
        className="connections-actions-container"
      >
        <Grid item xs={12} className="flex-center">
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
        <Grid item xs={6} className="flex-center">
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
        <Grid item xs={6} className="flex-center">
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
        <Grid item xs={6} className="flex-center">
          <Button
            onClick={() => navigateTo("create")}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Create a Game
          </Button>
        </Grid>
        <Grid item xs={6} className="flex-center">
          <Button
            onClick={() => navigateTo("archive")}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Archives
          </Button>
        </Grid>
        <Grid item xs={12} className="flex-center">
          <Button
            onClick={handleShareGame}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Share This Game
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;

import {Button, Grid2} from "@mui/material";
import {useConnectionsGameContext} from "@bored/providers";
import {shareLinkOrText, useNavigateToConnectionsPath} from "@bored/utils";
import {useSnackbar} from "notistack";

interface ActionsProps {
  onShareResults: () => void;
}

export const Actions = ({onShareResults}: ActionsProps) => {
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
      <Grid2
        container
        sx={{mt: 2, mb: 4}}
        spacing={1}
        rowGap={2}
        className="connections-actions-container"
      >
        <Grid2 size={12} className="flex-center">
          <Button
            onClick={submit}
            variant="contained"
            size="large"
            className="connections-submit-button"
            disabled={!selectionsComplete || gameCompleted}
            disableElevation
            color="secondary"
          >
            Submit
          </Button>
        </Grid2>
        <Grid2 size={6} className="flex-center">
          <Button
            onClick={shuffleOptions}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={gameCompleted}
            color="secondary"
          >
            Shuffle
          </Button>
        </Grid2>
        <Grid2 size={6} className="flex-center">
          <Button
            onClick={onShareResults}
            variant="outlined"
            size="large"
            className="connections-action-button"
            disabled={!gameCompleted}
            color="secondary"
          >
            View Results
          </Button>
        </Grid2>
        <Grid2 size={6} className="flex-center">
          <Button
            onClick={() => navigateTo("create")}
            variant="outlined"
            size="large"
            className="connections-action-button"
            color="secondary"
          >
            Create a Game
          </Button>
        </Grid2>
        <Grid2 size={6} className="flex-center">
          <Button
            onClick={() => navigateTo("archive")}
            variant="outlined"
            size="large"
            className="connections-action-button"
            color="secondary"
          >
            Archives
          </Button>
        </Grid2>
        <Grid2 size={12} className="flex-center">
          <Button
            onClick={handleShareGame}
            variant="outlined"
            size="large"
            className="connections-action-button"
            color="secondary"
          >
            Share This Game
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

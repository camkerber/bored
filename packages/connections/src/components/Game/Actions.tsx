import {Button, Grid} from "@mui/material";
import {useConnectionsGameContext} from "../../context";
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
        title: "Connections",
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
        spacing={1}
        className="connections-actions-container"
        sx={{
          rowGap: 2,
          mt: 2,
          mb: 4,
        }}
      >
        <Grid size={12} className="flex-center">
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
        </Grid>
        <Grid size={6} className="flex-center">
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
        </Grid>
        <Grid size={6} className="flex-center">
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
        </Grid>
        <Grid size={6} className="flex-center">
          <Button
            onClick={() => navigateTo("archive")}
            variant="outlined"
            size="large"
            className="connections-action-button"
            color="secondary"
          >
            Archives
          </Button>
        </Grid>
        <Grid size={6} className="flex-center">
          <Button
            onClick={handleShareGame}
            variant="outlined"
            size="large"
            className="connections-action-button"
            color="secondary"
          >
            Share This Game
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

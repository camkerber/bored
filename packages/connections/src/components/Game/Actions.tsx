import {Button, Grid} from "@mui/material";
import {useState} from "react";
// import {useCreateGame} from "@bored/api";
import {useConnectionsGameContext} from "@bored/providers";
import {useNavigateToConnectionsPath} from "@bored/utils";
import "@bored/styles";
// import { GAME_TEMPLATE_V2 } from "@bored/utils";

interface ActionsProps {
  onShareResults: () => void;
  onGetNewGame: () => Promise<void>;
}

const Actions = ({onShareResults, onGetNewGame}: ActionsProps) => {
  const {submit, shuffleOptions, selectionsComplete, gameCompleted} =
    useConnectionsGameContext();

  const [pauseNewGameButton, setPauseNewGameButton] = useState(false);
  const navigateTo = useNavigateToConnectionsPath();

  const handleGetNewGame = async () => {
    setPauseNewGameButton(true);
    await onGetNewGame();
    setTimeout(() => {
      setPauseNewGameButton(false);
    }, 3_000);
  };

  // const { createGame } = useCreateGame();

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
            disabled={!selectionsComplete}
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
            Share Results
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
            New Game
          </Button>
        </Grid>
        <Grid item xs={6} className="connections-action-button-container">
          <Button
            onClick={() => navigateTo("create")}
            // onClick={async () => {
            //   await createGame(GAME_TEMPLATE_V2);
            // }}
            variant="outlined"
            size="large"
            className="connections-action-button"
          >
            Create a Game
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;

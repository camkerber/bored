import {
  Button,
  CircularProgress,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {useCreateGameFormContext} from "@bored/providers";
import {CategoryV2, useNavigateToConnectionsPath} from "@bored/utils";
import {Author} from "./Author";
import {Connection} from "./Connection";
import {Title} from "./Title";
import {useCreateGame} from "@bored/api";

export const GameForm = () => {
  const {formIsValid, newGame, resetForm} = useCreateGameFormContext();

  const navigateTo = useNavigateToConnectionsPath();
  const {
    createGame,
    loading: creatingNewGame,
    error: creationError,
  } = useCreateGame();

  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleCreateNewGame = async () => {
    const returnedGame = await createGame(newGame);
    navigateTo(returnedGame?.id ?? "");
  };

  return (
    <Grid2 size={largerScreen ? 6 : 12}>
      <Grid2 container rowSpacing={4} mt={1} mb={4}>
        <Title />
        <Author />
        {Object.values(CategoryV2).map((category) => {
          return <Connection key={category} category={category} />;
        })}
        <Button
          variant="contained"
          size="large"
          sx={{mt: {xs: 9, sm: 9, md: 9, lg: 4}}}
          fullWidth
          disabled={!formIsValid}
          onClick={handleCreateNewGame}
        >
          {creatingNewGame ? <CircularProgress size={26} /> : "Create Game"}
          {creationError ? (
            <>
              <Typography>Failed to create game:</Typography>
              <Typography>{creationError?.message}</Typography>
            </>
          ) : null}
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={resetForm}
          sx={{mt: 2}}
        >
          Reset inputs
        </Button>
      </Grid2>
    </Grid2>
  );
};

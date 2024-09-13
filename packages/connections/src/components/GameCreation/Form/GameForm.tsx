import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {useCreateGameFormContext} from "@bored/providers";
import {CategoryV2} from "@bored/utils";
import Author from "./Author";
import Connection from "./Connection";
import Title from "./Title";

const GameForm = () => {
  const {formIsValid, createNewGame, creatingNewGame, creationError} =
    useCreateGameFormContext();

  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid item xs={largerScreen ? 6 : 12}>
      <Grid container rowSpacing={4} mt={1} mb={4}>
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
          onClick={createNewGame}
        >
          {creatingNewGame ? <CircularProgress size={26} /> : "Create Game"}
          {creationError ? (
            <>
              <Typography>Failed to create game:</Typography>
              <Typography>{creationError?.message}</Typography>
            </>
          ) : null}
        </Button>
      </Grid>
    </Grid>
  );
};

export default GameForm;

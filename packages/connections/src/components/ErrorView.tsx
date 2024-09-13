import { Button, Typography } from "@mui/material";

interface ErrorViewProps {
  getGameError: Error | null;
  newGameError: Error | null;
  onGetNewGame: () => Promise<void>;
}

const ErrorView = ({
  getGameError,
  newGameError,
  onGetNewGame,
}: ErrorViewProps) => {
  return (
    <>
      {getGameError || newGameError ? (
        <>
          <Typography variant='h6' color='error.main' mt={10}>
            {getGameError?.message || newGameError?.message}
          </Typography>
          <Button
            onClick={onGetNewGame}
            variant='outlined'
            size='large'
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </>
      ) : null}
    </>
  );
};

export default ErrorView;

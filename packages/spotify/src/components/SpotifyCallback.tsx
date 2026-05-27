import {Box, CircularProgress, Link, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {completeLogin} from "../auth/spotifyAuthClient";

export const SpotifyCallback = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await completeLogin(new URLSearchParams(window.location.search));
        if (!cancelled) navigate("/spotify", {replace: true});
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Login failed.";
        setErrorMessage(message);
        enqueueSnackbar(message, {variant: "error"});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [enqueueSnackbar, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        gap: 2,
      }}
    >
      {errorMessage ? (
        <>
          <Typography variant="h6">Login failed</Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            {errorMessage}
          </Typography>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/spotify", {replace: true})}
          >
            Back to Spotify
          </Link>
        </>
      ) : (
        <>
          <CircularProgress />
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            Finishing sign-in...
          </Typography>
        </>
      )}
    </Box>
  );
};

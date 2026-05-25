import {Backdrop, CircularProgress, Typography} from "@mui/material";

interface BingoSubmitOverlayProps {
  open: boolean;
}

export const BingoSubmitOverlay = ({open}: BingoSubmitOverlayProps) => (
  <Backdrop
    open={open}
    sx={{
      position: "absolute",
      color: "#fff",
      zIndex: 1,
      flexDirection: "column",
      gap: 2,
      borderRadius: 1,
    }}
  >
    <CircularProgress color="inherit" />
    <Typography>Creating your board...</Typography>
  </Backdrop>
);

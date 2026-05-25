import {Box, CircularProgress} from "@mui/material";

export const BoardLoadingState = () => (
  <Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
    <CircularProgress />
  </Box>
);

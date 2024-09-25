import {Typography} from "@mui/material";

export const ListHeader = () => {
  return (
    <>
      <Typography variant="h4">Game Archives</Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        Click a title to open the game
      </Typography>
    </>
  );
};

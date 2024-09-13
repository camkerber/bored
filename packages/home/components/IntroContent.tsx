import React from "react";
import { Paper, Typography } from "@mui/material";
// import "../../index.css";

export const IntroContent = () => {
  return (
    <>
      <Paper className="paper-container" elevation={2}>
        <Typography variant="body1">
          Hi, my name is Cam and I created this repo as a home for different
          projects I created out of curiosity. In the top right you can find
          links to my socials or toggle light/dark mode.
        </Typography>
        <br />
        <Typography variant="body1">
          Click on a card below to see one of my projects.
        </Typography>
      </Paper>
    </>
  );
};

import {Paper, Typography} from "@mui/material";

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
          Scroll or swipe through the cards below and click to see one of my
          projects.
        </Typography>
      </Paper>
    </>
  );
};

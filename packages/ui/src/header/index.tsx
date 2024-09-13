import {AppBar, Toolbar, Typography} from "@mui/material";
import ColorModeToggle from "./ColorModeToggle";
import GitHubProfile from "./GitHubProfile";
import LinkedInProfile from "./LinkedInProfile";
import ReturnHome from "./ReturnHome";

export const Header = () => {
  return (
    <AppBar component="nav" position="static" sx={{mb: 4}}>
      <Toolbar>
        <ReturnHome />
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Cam is bored
        </Typography>
        <ColorModeToggle />
        <LinkedInProfile />
        <GitHubProfile />
      </Toolbar>
    </AppBar>
  );
};

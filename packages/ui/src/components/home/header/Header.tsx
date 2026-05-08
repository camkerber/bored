import {Box, Typography} from "@mui/material";
import {GitHubLinkButton} from "./GitHubLinkButton";
import {LinkedInLinkButton} from "./LinkedInLinkButton";
import {LocationWidget} from "./LocationWidget";

export const Header = () => {
  return (
    <Box sx={{alignSelf: "baseline"}}>
      <Typography variant="h2">Cam Kerber</Typography>
      <Box
        sx={{
          gap: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <LocationWidget />
        <LinkedInLinkButton />
        <GitHubLinkButton />
      </Box>
    </Box>
  );
};

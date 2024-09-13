import GitHubIcon from "@mui/icons-material/GitHub";
import {IconButton, Tooltip} from "@mui/material";

const GitHubProfile = () => {
  return (
    <Tooltip title="Check out my GitHub" placement="bottom-end">
      <IconButton
        color="inherit"
        href="https://github.com/camkerber"
        target="_blank"
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
};

export default GitHubProfile;

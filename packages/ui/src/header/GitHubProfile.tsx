import GitHubIcon from "@mui/icons-material/GitHub";
import {IconButton, Tooltip} from "@mui/material";

export const GitHubProfile = () => {
  return (
    <Tooltip title="Check out my GitHub" placement="bottom-end">
      <IconButton
        color="secondary"
        href="https://github.com/camkerber"
        target="_blank"
        size="large"
      >
        <GitHubIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

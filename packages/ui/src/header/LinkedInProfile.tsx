import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {IconButton, Tooltip} from "@mui/material";

export const LinkedInProfile = () => {
  return (
    <Tooltip title="Connect with me on LinkedIn" placement="bottom-end">
      <IconButton
        color="inherit"
        href="https://www.linkedin.com/in/cameron-kerber/"
        target="_blank"
      >
        <LinkedInIcon />
      </IconButton>
    </Tooltip>
  );
};

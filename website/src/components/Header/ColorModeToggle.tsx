import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {IconButton, Tooltip, useTheme} from "@mui/material";
import {useColorModeContext} from "@bored/providers";
import "@bored/styles";

const ColorModeToggle = () => {
  const theme = useTheme();
  const colorMode = useColorModeContext();

  return (
    <Tooltip
      title={`Toggle on ${colorMode.mode === "dark" ? "light" : "dark"} mode`}
      placement="bottom-end"
    >
      <IconButton
        sx={{ml: 1}}
        onClick={colorMode.toggleColorMode}
        color="inherit"
        className="color-mode-toggle"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ColorModeToggle;

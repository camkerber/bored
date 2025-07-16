import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const ReturnHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const medScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Tooltip title="Return to home page" placement="bottom-start">
      <Button
        sx={{mr: 1, gap: 1}}
        onClick={() => navigate("/")}
        color="inherit"
      >
        <ArrowBackIcon />
        {medScreen ? <Typography variant="h4">Home</Typography> : null}
      </Button>
    </Tooltip>
  );
};

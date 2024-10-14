import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton, Tooltip} from "@mui/material";
import {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const ReturnHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showReturnButton = useMemo(() => {
    return location.pathname !== "/";
  }, [location]);

  return (
    <>
      {showReturnButton ? (
        <Tooltip title="Return to home page" placement="bottom-start">
          <IconButton
            sx={{mr: 1}}
            onClick={() => navigate("/")}
            color="inherit"
            className="return-home"
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
};

import "./index.css";
import Container from "@mui/material/Container";
import {Outlet, useLocation} from "react-router-dom";
import {ReturnHome} from "@bored/ui";
import {Box, useMediaQuery, useTheme} from "@mui/material";

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!isHomePage ? (
        <Box sx={{p: 1}}>
          <ReturnHome />
        </Box>
      ) : null}
      <Container
        className={isHomePage && !smallScreen ? "outlet-std-web" : "outlet"}
      >
        <Outlet />
      </Container>
    </>
  );
};

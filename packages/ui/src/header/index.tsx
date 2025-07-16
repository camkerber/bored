import {Container, Typography} from "@mui/material";
import {GitHubProfile} from "./GitHubProfile";
import {LinkedInProfile} from "./LinkedInProfile";
import {ReturnHome} from "./ReturnHome";
import {useMemo} from "react";
import {useLocation} from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const showReturnButton = useMemo(() => {
    return location.pathname !== "/";
  }, [location]);

  return (
    <Container
      component="nav"
      className="flex-center"
      sx={{
        mb: 4,
        mt: 1,
      }}
    >
      <Container component="div" disableGutters sx={{flexGrow: 1}}>
        {showReturnButton ? (
          <ReturnHome />
        ) : (
          <>
            <Typography variant="h2">Cam Kerber</Typography>
            <Typography variant="h6" sx={{ml: 1}}>
              Frontend Engineer
            </Typography>
          </>
        )}
      </Container>
      {showReturnButton ? null : (
        <div className="floating-link-buttons">
          <LinkedInProfile />
          <GitHubProfile />
        </div>
      )}
    </Container>
  );
};

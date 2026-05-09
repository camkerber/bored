import {Typography} from "@mui/material";
import {useRouteError} from "react-router-dom";
import {toError} from "@bored/utils";

export const ErrorPage = () => {
  const routeError = useRouteError();
  if (!routeError) return null;

  const error = toError(routeError);

  return (
    <>
      <Typography variant="body1">
        Sorry, an unhandled error occurred.
      </Typography>
      <Typography variant="h6" color="error.main" mt={10}>
        {error.message}
      </Typography>
    </>
  );
};

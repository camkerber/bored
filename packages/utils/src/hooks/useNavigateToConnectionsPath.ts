import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useNavigateToConnectionsPath = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const connectionsUrl = new URL(".", window.origin + location.pathname);

  const navigateTo = useCallback(
    (path: string) => {
      navigate(connectionsUrl.pathname + path);
    },
    [connectionsUrl.pathname, navigate],
  );

  return navigateTo;
};

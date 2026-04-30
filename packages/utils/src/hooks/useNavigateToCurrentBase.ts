import {useCallback, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useNavigateToCurrentBase = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const basePath = useMemo(
    () => new URL(".", window.origin + pathname).pathname,
    [pathname],
  );

  return useCallback(
    (path: string) => {
      navigate(basePath + path);
    },
    [basePath, navigate],
  );
};

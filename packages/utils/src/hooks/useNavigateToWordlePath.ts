import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useNavigateToWordlePath = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const wordleUrl = new URL(".", window.origin + location.pathname);

  const navigateTo = useCallback(
    (path: string) => {
      navigate(wordleUrl.pathname + path);
    },
    [wordleUrl.pathname, navigate],
  );

  return navigateTo;
};

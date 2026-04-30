import {useContext} from "react";
import {SpotifyAuthContext} from "./SpotifyAuthProvider";

export const useSpotifyAuth = () => {
  const context = useContext(SpotifyAuthContext);
  if (!context) {
    throw new Error(
      "SpotifyAuthContext is undefined. It can only be used within SpotifyAuthProvider.",
    );
  }
  return context;
};

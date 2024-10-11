import {CircularProgress, Typography} from "@mui/material";
import {PropsWithChildren} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";

export const AuthenticationInit = ({children}: PropsWithChildren) => {
  const {initializing} = useFirebaseContext();

  return (
    <>
      {initializing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <CircularProgress size={70} />
          <Typography variant="h6">Initializing firebase...</Typography>
        </div>
      ) : (
        children
      )}
    </>
  );
};

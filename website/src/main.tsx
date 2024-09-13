import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AppRouter} from "./AppRouter";
import {ColorModeProvider, FirebaseProvider} from "@bored/providers";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <SnackbarProvider>
        <FirebaseProvider>
          <CssBaseline />
          <AppRouter />
        </FirebaseProvider>
      </SnackbarProvider>
    </ColorModeProvider>
  </StrictMode>,
);

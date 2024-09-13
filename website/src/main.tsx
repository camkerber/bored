import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter";
import { ColorModeProvider, FirebaseProvider } from "@cam-is-bored/providers";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";

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

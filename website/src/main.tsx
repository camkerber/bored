import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AppRouter} from "./AppRouter";
import {ColorModeProvider} from "@bored/providers";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";
import {
  assignAppCheckDebugToken,
  FirebaseProvider,
} from "@camkerber/react-firebase-db";
import {
  FIREBASE_APPCHECK_DEBUG_TOKEN,
  firebaseOptions,
  RECAPTCHA_SITE_KEY,
} from "@bored/utils";

assignAppCheckDebugToken(FIREBASE_APPCHECK_DEBUG_TOKEN);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <SnackbarProvider>
        <FirebaseProvider
          options={firebaseOptions}
          withAnonymousAuth
          recaptchaSiteKey={RECAPTCHA_SITE_KEY}
        >
          <CssBaseline />
          <AppRouter />
        </FirebaseProvider>
      </SnackbarProvider>
    </ColorModeProvider>
  </StrictMode>,
);

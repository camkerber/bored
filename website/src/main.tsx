import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AppRouter} from "./AppRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
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
import {buildTheme} from "./theme";

assignAppCheckDebugToken(FIREBASE_APPCHECK_DEBUG_TOKEN);

const muiTheme = buildTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
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
    </ThemeProvider>
  </StrictMode>,
);

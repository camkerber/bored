import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AppRouter} from "./AppRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {SnackbarProvider} from "notistack";
import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/react";
import {theme} from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <AppRouter />
        <Analytics />
        <SpeedInsights />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);

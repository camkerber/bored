import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, PropsWithChildren, useMemo, useState } from "react";

export interface ColorMode {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const COLOR_MODE_CONTEXT_DEFAULT: ColorMode = {
  toggleColorMode: () => {},
  mode: "light",
};

export const ColorModeContext = createContext(COLOR_MODE_CONTEXT_DEFAULT);

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light",
  );
  const colorMode: ColorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

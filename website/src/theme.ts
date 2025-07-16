/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {createTheme, PaletteOptions, ThemeOptions} from "@mui/material/styles";

const palette = {
  mode: "light",
  primary: {
    main: "#283618",
    light: "#606C38",
    dark: "#1C2510",
  },
  secondary: {
    main: "#bc6c25",
    light: "#DDA15E",
    dark: "#834B19",
  },
  background: {
    default: "#fefae0",
    paper: "#fefae0",
  },
};

const castedPalette = palette as PaletteOptions;

const themeOptions: ThemeOptions = {
  palette: castedPalette,
  typography: {
    fontFamily: "Noto Serif JP",
    h1: {
      fontFamily: "Gloock",
      fontWeight: 900,
      color: palette.primary.main,
    },
    h2: {
      fontFamily: "Gloock",
      fontWeight: 900,
      color: palette.primary.main,
    },
    h3: {
      fontFamily: "Gloock",
      fontWeight: 900,
      color: palette.primary.main,
    },
    h4: {
      fontFamily: "Gloock",
      fontWeight: 900,
      color: palette.primary.main,
    },
    h5: {
      fontFamily: "Gloock",
      fontWeight: 900,
      color: palette.primary.light,
    },
    h6: {
      fontFamily: "Gloock",
      fontWeight: 300,
      color: palette.primary.light,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
          borderRadius: 0,
          borderWidth: "2px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: "2px",
        },
      },
    },
  },
};

export const buildTheme = () => createTheme(themeOptions);

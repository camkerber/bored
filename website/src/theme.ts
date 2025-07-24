/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {createTheme, PaletteOptions, ThemeOptions} from "@mui/material/styles";

const palette = {
  mode: "light",
  primary: {
    main: "#0f214d",
  },
  secondary: {
    main: "#283f22",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
};

const castedPalette = palette as PaletteOptions;

const themeOptions: ThemeOptions = {
  palette: castedPalette,
  typography: {
    fontFamily: "Space Grotesk",
    h1: {
      fontWeight: 700,
      color: palette.primary.main,
    },
    h2: {
      fontWeight: 700,
      color: palette.primary.main,
    },
    h3: {
      fontWeight: 700,
      color: palette.primary.main,
    },
    h4: {
      fontWeight: 700,
      color: palette.primary.main,
    },
    h5: {
      fontWeight: 500,
      color: palette.primary.main,
    },
    h6: {
      fontWeight: 300,
      color: palette.primary.main,
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
          "&.MuiAccordion-root:first-of-type": {
            borderRadius: 0,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderTop: `2px solid ${palette.primary.main}`,
          // "&.Mui-expanded": {
          //   margin: 0,
          // },
        },
      },
    },
  },
};

export const buildTheme = () => createTheme(themeOptions);

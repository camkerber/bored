import {
  createTheme,
  type PaletteOptions,
  type ThemeOptions,
} from "@mui/material/styles";

const palette = {
  mode: "light",
  primary: {
    main: "#18191c",
  },
  secondary: {
    main: "#47120c",
  },
  background: {
    default: "#f6f3ed",
    paper: "#f6f3ed",
  },
} satisfies PaletteOptions;

// alertnate colors
// tan-gray: #b9adac
// khaki: #a98661

const themeOptions: ThemeOptions = {
  palette,
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
          "&.Mui-expanded": {
            marginTop: 0,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

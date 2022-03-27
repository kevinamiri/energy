import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 0.86,
            color: "#42526e",
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: "#6b778c",
    },
    background: {
      default: "#f3f4f7",
      paper: "#ffffff",
    },
    error: {
      contrastText: "#ffffff",
      main: "#FB9300",
    },
    mode: "light",
    primary: {
      contrastText: "#ffffff",
      main: "#308f96",
    },
    success: {
      contrastText: "#ffffff",
      main: "#4caf50",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
    warning: {
      contrastText: "#ffffff",
      main: "#FB9300",
    },
    info: {
      contrastText: "#ffffff",
      main: "#0288d1",
    },
  },
});

export default theme;

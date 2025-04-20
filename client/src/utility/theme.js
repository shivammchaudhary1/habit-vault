import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6a1b9a", // purple
    },
    secondary: {
      main: "#ff4081", // pink
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;

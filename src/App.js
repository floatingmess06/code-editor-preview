import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import CodeEditor from "./neweditor";

// Creating a custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Default code examples
const defaultHtml = `<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to the live code editor. Edit me and see the changes instantly!</p>
  <button id="changeColorBtn">Click to change colors</button>
</div>`;

const defaultCss = `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  color: #666;
  line-height: 1.6;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}`;

const defaultJs = `// JavaScript code
const button = document.getElementById('changeColorBtn');
const container = document.querySelector('.container');
const heading = document.querySelector('h1');
const body = document.body;

// Array of background colors
const colors = [
  '#f5f5f5', '#ffe0e0', '#e0ffe0', '#e0e0ff', '#fff0e0', '#e0ffff', '#ffe0ff'
];

// Array of container colors
const containerColors = [
  'white', '#fff8f8', '#f8fff8', '#f8f8ff', '#fffaf8', '#f8ffff', '#fff8ff'
];

// Keep track of the current color index
let colorIndex = 0;

// Add event listener to the button
button.addEventListener('click', function() {
  // Increment color index and loop back if needed
  colorIndex = (colorIndex + 1) % colors.length;
  
  // Change background color
  body.style.backgroundColor = colors[colorIndex];
  
  // Change container background color
  container.style.backgroundColor = containerColors[colorIndex];
  
  // Change heading color randomly
  heading.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
  
  // Add a message to show the color was changed
  const message = document.createElement('p');
  message.textContent = 'Colors changed!';
  message.style.textAlign = 'center';
  message.style.color = '#888';
  message.style.fontSize = '0.8em';
  
  // Remove the message after 2 seconds
  setTimeout(() => {
    message.remove();
  }, 2000);
  
  container.appendChild(message);
});

// Add a console message for developers
console.log('Script loaded successfully! Try clicking the button.');`;

const CodeEditor = () => {
  // State for code content
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [srcDoc, setSrcDoc] = useState("");

  // UI state
  const [currentTab, setCurrentTab] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Feature 4: Debounced Updates - Wait 750ms after typing before updating preview
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 750);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  // Feature 1: Tab System - Switch between HTML, CSS, and JavaScript editors
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Feature 2: Monaco Editor Integration with appropriate settings for each language
  const getEditorByTab = () => {
    const commonOptions = {
      minimap: { enabled: false },
      fontSize: 14,
      wordWrap: "on",
      automaticLayout: true,
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      roundedSelection: false,
      padding: { top: 10 },
    };

    switch (currentTab) {
      case 0:
        return (
          <Editor
            height="40vh"
            defaultLanguage="html"
            value={html}
            onChange={setHtml}
            theme="vs-dark"
            options={{
              ...commonOptions,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        );
      case 1:
        return (
          <Editor
            height="40vh"
            defaultLanguage="css"
            value={css}
            onChange={setCss}
            theme="vs-dark"
            options={{
              ...commonOptions,
              colorDecorators: true,
            }}
          />
        );
      case 2:
        return (
          <Editor
            height="40vh"
            defaultLanguage="javascript"
            value={js}
            onChange={setJs}
            theme="vs-dark"
            options={{
              ...commonOptions,
              suggestOnTriggerCharacters: true,
              tabCompletion: "on",
              parameterHints: {
                enabled: true,
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  // Feature 5: Reset Functionality - Button to restore default code examples
  const handleReset = () => {
    setHtml(defaultHtml);
    setCss(defaultCss);
    setJs(defaultJs);

    showSnackbar("Code reset to defaults", "info");
  };

  // Force update preview (skip debounce)
  const handleForceUpdate = () => {
    setSrcDoc(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `);

    showSnackbar("Preview updated", "success");
  };

  // Copy current tab's code to clipboard
  const handleCopyCode = () => {
    let codeToCopy = "";

    switch (currentTab) {
      case 0:
        codeToCopy = html;
        break;
      case 1:
        codeToCopy = css;
        break;
      case 2:
        codeToCopy = js;
        break;
      default:
        return;
    }

    navigator.clipboard.writeText(codeToCopy).then(
      () => {
        showSnackbar("Code copied to clipboard", "success");
      },
      () => {
        showSnackbar("Failed to copy code", "error");
      }
    );
  };

  // Snackbar notification helper
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Editor Preview
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleCopyCode}
            title="Copy code"
          >
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleForceUpdate}
            title="Run code"
          >
            <PlayArrowIcon />
          </IconButton>
          <Button
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            title="Reset to defaults"
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ mb: 2 }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="HTML" />
              <Tab label="CSS" />
              <Tab label="JavaScript" />
            </Tabs>
            {getEditorByTab()}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 1, height: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{ p: 1, borderBottom: "1px solid #ddd" }}
            >
              Preview
            </Typography>
            <Box sx={{ height: "calc(40vh + 48px)", overflow: "hidden" }}>
              <iframe
                srcDoc={srcDoc}
                title="preview"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                style={{ border: "none", backgroundColor: "white" }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeEditor;

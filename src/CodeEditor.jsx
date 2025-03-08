import React, { useEffect , useRef} from "react";
import {
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
// Custom Components
import SideDrawer from "./components/SideDrawer";
import EditorSection from "./components/EditorSection";
import PreviewSection from "./components/PreviewSection";
import LogoText from "./components/subcomponents/LogoText";

import useEditorStore from "./store/useEditorStore";
import NavigationBar from "./components/NavigationBar";
import defaults from "./utils/utils";

const [defaultHtml, defaultCss, defaultJs] = defaults();

// Main component
const CodeEditor = () => {
  // State for code content
  const {
    html,
    css,
    js,
    darkMode,
    isSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setHtml,
    setCss,
    setJs,
    setLayout,
    setEditorExpanded,
    setPreviewExpanded,
    setDarkMode,
    setIsSnackbarOpen,
    setSnackbar,
    setViewMenuAnchor,
    setMonacoTheme,
    setDeviceFrame,
    setSrcDoc,
  } = useEditorStore(); // Destructure the store's state and actions

  const isMounted = useRef(true);

  // Feature 4:
  // Debounced update of preview (Waits 750ms before updating)
  useEffect(() => {
    isMounted.current = true;
    const timeout = setTimeout(() => {
      if (isMounted.current) {
        setSrcDoc();
      }
    }, 750);

    return () => {
      isMounted.current = false;
      clearTimeout(timeout);
    };
  }, [html, css, js, setSrcDoc]); // Dependencies

  // Update theme when darkMode changes
  useEffect(() => {
    setMonacoTheme(darkMode ? "vs-dark" : "vs");
  }, [darkMode, setMonacoTheme]);

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

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle layout changes
  const handleSetLayout = (newLayout) => {
    setLayout(newLayout);
    setEditorExpanded(newLayout === "code-focus");
    setPreviewExpanded(newLayout === "preview-focus");
    setViewMenuAnchor(null);
  };

  // Handle device frame selection
  const handleDeviceFrameChange = (device) => {
    setDeviceFrame(device);
    setViewMenuAnchor(null);
  };

  // Download project as HTML file
  const handleDownloadProject = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Editor Project</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code-editor-project.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showSnackbar("Project downloaded as HTML file", "success");
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Snackbar notification helper
  const showSnackbar = (message, severity) => {
    setSnackbar(true, message, severity);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: darkMode
          ? "radial-gradient(circle at 10% 20%, rgb(21, 27, 40) 0%, rgb(10, 12, 18) 90.1%)"
          : "radial-gradient(circle at 10% 20%, rgb(236, 242, 254) 0%, rgb(252, 252, 252) 90.1%)",
      }}
    >
      {/* Navigation Bar */}
      <NavigationBar
        handleForceUpdate={handleForceUpdate}
        handleDeviceFrameChange={handleDeviceFrameChange}
        handleSetLayout={handleSetLayout}
        handleToggleDarkMode={handleToggleDarkMode}
      ></NavigationBar>

      <Box
        sx={{ flexGrow: 1, display: "flex", overflow: "hidden", p: 2, gap: 2 }}
      >
        {/* Editor Section */}
        <EditorSection showSnackbar={showSnackbar}></EditorSection>

        {/* Preview Section */}
        <PreviewSection
          handleReset={handleReset}
          handleDownloadProject={handleDownloadProject}
        ></PreviewSection>
      </Box>

      {/* Side Drawer */}
      <SideDrawer
        LogoText={LogoText}
        handleReset={handleReset}
        handleDeviceFrameChange={handleDeviceFrameChange}
        handleForceUpdate={handleForceUpdate}
        handleDownloadProject={handleDownloadProject}
        handleToggleDarkMode={handleToggleDarkMode}
        handleSetLayout={handleSetLayout}
      ></SideDrawer>

      {/* Snackbar notifications */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            backdropFilter: "blur(10px)",
            backgroundColor: darkMode
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeEditor;

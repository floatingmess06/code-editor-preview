import React, { useEffect, useRef } from "react";
// import { Box, Paper, Grid, AppBar, Toolbar, Typography, Tab, Tabs, Button, IconButton, Snackbar, Alert, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Switch, FormControlLabel, Menu, MenuItem, Tooltip, Zoom } from '@mui/material';
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import { styled, alpha } from '@mui/material/styles';
import Editor from "@monaco-editor/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
// import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import SaveIcon from '@mui/icons-material/Save';
// import ShareIcon from '@mui/icons-material/Share';
import MenuIcon from "@mui/icons-material/Menu";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
// import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from "@mui/icons-material/Download";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TabletIcon from "@mui/icons-material/Tablet";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SideDrawer from "../components/SideDrawer";
import EditorWrapper from "../components/EditorWrapper";
import PreviewContainer from "../components/PreviewContainer";
import useEditorStore from "../store/useEditorStore";
import GlassAppBar from "../components/subcomponents/GlassAppBar";
import TabPanel from "../components/subcomponents/TabPanel";
import LogoText from "../components/subcomponents/LogoText";
import CircleIconButton from "../components/subcomponents/CircleIconButton";
import GlassPaper from "../components/subcomponents/GlassPaper";
import StyledTabs from "../components/subcomponents/StyledTabs";
import StyledTab from "../components/subcomponents/StyledTab";
import defaults from "../utils/utils";


// Default code examples
// const defaultHtml = `<div class="container">
//   <div class="card">
//     <div class="card-header">
//       <h1>Interactive Code Editor</h1>
//       <p class="subtitle">Edit and see changes in real-time</p>
//     </div>
//     <div class="card-body">
//       <div class="profile">
//         <div class="avatar">
//           <div class="initial">C</div>
//         </div>
//         <div class="info">
//           <h2>Welcome!</h2>
//           <p>This is a live preview of your code.</p>
//         </div>
//       </div>
//       <div class="actions">
//         <button id="primary-btn" class="btn primary">Change Theme</button>
//         <button id="secondary-btn" class="btn secondary">Animate</button>
//       </div>
//       <div class="status">Ready to code!</div>
//     </div>
//   </div>
// </div>`;

// const defaultCss = `* {
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
//   transition: all 0.3s ease;
// }

// body {
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   background-color: #f7f9fc;
//   color: #333;
//   padding: 20px;
//   line-height: 1.6;
// }

// .container {
//   max-width: 800px;
//   margin: 0 auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 80vh;
// }

// .card {
//   background: white;
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 500px;
// }

// .card-header {
//   background: linear-gradient(135deg, #6e8efb, #a777e3);
//   color: white;
//   padding: 20px;
//   text-align: center;
// }

// h1 {
//   font-size: 24px;
//   margin-bottom: 5px;
// }

// .subtitle {
//   font-size: 14px;
//   opacity: 0.8;
// }

// .card-body {
//   padding: 20px;
// }

// .profile {
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// }

// .avatar {
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background: linear-gradient(45deg, #a777e3, #6e8efb);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 15px;
// }

// .initial {
//   color: white;
//   font-size: 24px;
//   font-weight: bold;
// }

// .info h2 {
//   font-size: 18px;
//   margin-bottom: 5px;
// }

// .actions {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// }

// .btn {
//   padding: 10px 15px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: 500;
//   flex-grow: 1;
// }

// .primary {
//   background: #6e8efb;
//   color: white;
// }

// .secondary {
//   background: transparent;
//   color: #6e8efb;
//   border: 1px solid #6e8efb;
// }

// .btn:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// }

// .status {
//   text-align: center;
//   padding: 10px;
//   background: #f8f9fa;
//   border-radius: 5px;
//   font-size: 14px;
//   color: #666;
// }

// /* Dark theme classes that will be toggled */
// .dark-theme {
//   background-color: #1a1a2e;
//   color: #e6e6e6;
// }

// .dark-theme .card {
//   background: #16213e;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
// }

// .dark-theme .status {
//   background: #0f3460;
//   color: #e6e6e6;
// }

// /* Animation class */
// .animate {
//   animation: pulse 1.5s infinite;
// }

// @keyframes pulse {
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
//   100% {
//     transform: scale(1);
//   }
// }`;

// const defaultJs = `// Interactive elements
// const themeButton = document.getElementById('primary-btn');
// const animateButton = document.getElementById('secondary-btn');
// const container = document.querySelector('.container');
// const card = document.querySelector('.card');
// const status = document.querySelector('.status');

// // Theme toggle
// let isDarkTheme = false;
// themeButton.addEventListener('click', () => {
//   isDarkTheme = !isDarkTheme;
//   document.body.classList.toggle('dark-theme', isDarkTheme);
//   container.classList.toggle('dark-theme', isDarkTheme);
  
//   // Update status and button text
//   status.textContent = isDarkTheme ? 'Dark theme activated!' : 'Light theme activated!';
//   themeButton.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
  
//   // Change status background color with animation
//   status.style.transition = 'background-color 0.5s, color 0.5s';
  
//   // Log to console
//   console.log('Theme changed to:', isDarkTheme ? 'dark' : 'light');
// });

// // Animation toggle
// let isAnimating = false;
// animateButton.addEventListener('click', () => {
//   isAnimating = !isAnimating;
//   card.classList.toggle('animate', isAnimating);
  
//   // Update status and button text
//   status.textContent = isAnimating ? 'Animation started!' : 'Animation stopped!';
//   animateButton.textContent = isAnimating ? 'Stop' : 'Animate';
  
//   // Log to console
//   console.log('Animation:', isAnimating ? 'started' : 'stopped');
// });

// // Add some interactivity to the avatar
// const avatar = document.querySelector('.avatar');
// const initial = document.querySelector('.initial');
// const letters = 'CODEXY';
// let currentIndex = 0;

// avatar.addEventListener('click', () => {
//   // Change the initial letter
//   currentIndex = (currentIndex + 1) % letters.length;
//   initial.textContent = letters[currentIndex];
  
//   // Add a brief scaling effect
//   avatar.style.transform = 'scale(1.2)';
//   setTimeout(() => {
//     avatar.style.transform = 'scale(1)';
//   }, 200);
  
//   // Update status
//   status.textContent = 'Avatar updated: ' + letters[currentIndex];
  
//   // Log to console
//   console.log('Avatar initial changed to:', letters[currentIndex]);
// });

// // Initialize with a welcome message
// console.log('Interactive demo loaded successfully!');
// status.textContent = 'Ready to code! Click buttons to see actions.';`;

const [defaultHtml, defaultCss, defaultJs] = defaults();


// Custom styled components for unique UI
// const GlassAppBar = styled(AppBar)(({ theme }) => ({
//   background: "rgba(15, 23, 42, 0.8)",
//   backdropFilter: "blur(10px)",
//   boxShadow: "none",
//   borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
// }));

// const GlassBox = styled(Box)(({ theme }) => ({
//   background: "rgba(30, 41, 59, 0.7)",
//   backdropFilter: "blur(10px)",
//   borderRadius: theme.shape.borderRadius,
//   border: "1px solid rgba(255, 255, 255, 0.05)",
//   overflow: "hidden",
// }));

// const GlassPaper = styled(Paper)(({ theme }) => ({
//   background: "rgba(30, 41, 59, 0.7)",
//   backdropFilter: "blur(10px)",
//   border: "1px solid rgba(255, 255, 255, 0.05)",
// }));

// const LogoText = styled(Typography)(({ theme }) => ({
//   background: "linear-gradient(to right, #38bdf8, #818cf8)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   fontWeight: "bold",
//   display: "flex",
//   alignItems: "center",
//   "& svg": {
//     marginRight: theme.spacing(1),
//   },
// }));

// const TabPanel = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(0),
//   height: "100%",
// }));

// const StyledTabs = styled(Tabs)(({ theme }) => ({
//   "& .MuiTabs-indicator": {
//     height: 3,
//     background: "linear-gradient(to right, #38bdf8, #818cf8)",
//   },
// }));

// const StyledTab = styled(Tab)(({ theme }) => ({
//   textTransform: "none",
//   fontWeight: "bold",
//   fontSize: "0.9rem",
//   minHeight: 48,
//   transition: "all 0.2s",
//   "&.Mui-selected": {
//     color: "#38bdf8",
//   },
//   "&:hover": {
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//   },
// }));

// const ActionButton = styled(Button)(({ theme }) => ({
//   borderRadius: "8px",
//   padding: "8px 16px",
//   textTransform: "none",
//   fontWeight: "bold",
//   transition: "all 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//   },
// }));

// const CircleIconButton = styled(IconButton)(({ theme }) => ({
//   borderRadius: "50%",
//   padding: 8,
//   color: "white",
//   background: "linear-gradient(135deg, #38bdf8, #818cf8)",
//   "&:hover": {
//     background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
//     transform: "scale(1.1)",
//   },
//   transition: "all 0.2s",
// }));

// const PreviewContainer = styled(Box)(({ theme, deviceFrame }) => {
//   const frames = {
//     mobile: {
//       width: "375px",
//       height: "667px",
//       borderRadius: "20px",
//       padding: "15px",
//     },
//     tablet: {
//       width: "768px",
//       height: "1024px",
//       borderRadius: "12px",
//       padding: "10px",
//     },
//     laptop: {
//       width: "100%",
//       height: "100%",
//       borderRadius: "6px",
//       padding: "0",
//     },
//     desktop: {
//       width: "100%",
//       height: "100%",
//       borderRadius: "0",
//       padding: "0",
//     },
//   };

//   return {
//     position: "relative",
//     width: deviceFrame === "none" ? "100%" : frames[deviceFrame].width,
//     height: deviceFrame === "none" ? "100%" : frames[deviceFrame].height,
//     maxWidth: "100%",
//     maxHeight: "calc(100vh - 180px)",
//     margin: "0 auto",
//     overflow: "hidden",
//     borderRadius:
//       deviceFrame === "none" ? "6px" : frames[deviceFrame].borderRadius,
//     border: deviceFrame === "none" ? "none" : "10px solid #222",
//     boxShadow:
//       deviceFrame === "none" ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//     background: "#000",
//     transition: "all 0.3s ease",
//   };
// });

// const EditorWrapper = styled(Box)(({ theme, expanded }) => ({
//   height: expanded ? "calc(100vh - 64px)" : "40vh",
//   transition: "height 0.3s ease",
//   position: "relative",
//   display: "flex",
//   flexDirection: "column",
// }));

// Main component
// Main component
const CodeEditor = () => {
  // State for code content
  // const [html, setHtml] = useState(defaultHtml);
  // const [css, setCss] = useState(defaultCss);
  // const [js, setJs] = useState(defaultJs);
  // const [srcDoc, setSrcDoc] = useState("");

  // // UI state
  // const [currentTab, setCurrentTab] = useState(0);
  // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(true);
  // const [editorExpanded, setEditorExpanded] = useState(false);
  // const [previewExpanded, setPreviewExpanded] = useState(false);
  // const [deviceFrame, setDeviceFrame] = useState("laptop");
  // const [viewMenuAnchor, setViewMenuAnchor] = useState(null);
  // const [monacoTheme, setMonacoTheme] = useState("vs-dark");
  // const [layout, setLayout] = useState("split"); // 'split', 'code-focus', 'preview-focus'

  const {
    html,
    css,
    js,
    currentTab,
    layout,
    darkMode,
    isSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    drawerOpen,
    deviceFrame,
    viewMenuAnchor,
    monacoTheme,
    editorExpanded,
    previewExpanded,
    srcDoc,
    setHtml,
    setCss,
    setJs,
    setCurrentTab,
    setLayout,
    setEditorExpanded,
    setPreviewExpanded,
    setDarkMode,
    setIsSnackbarOpen,
    setSnackbar,
    setViewMenuAnchor,
    setMonacoTheme,
    setDrawerOpen,
    setDeviceFrame,
    setSrcDoc,
  } = useEditorStore(); // Destructure the store's state and actions
  
  const previewContainerRef = useRef(null);
  const editorContainerRef = useRef(null);

  // Feature 4: Debounced Updates - Wait 750ms after typing before updating preview
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setSrcDoc(`
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <style>${css}</style>
  //         </head>
  //         <body>
  //           ${html}
  //           <script>${js}</script>
  //         </body>
  //       </html>
  //     `);
  //   }, 750);

  //   return () => clearTimeout(timeout);
  // }, [html, css, js]);
  // Debounced update of preview
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(); // This will update `srcDoc` based on the current html, css, and js
    }, 750);

    return () => clearTimeout(timeout);
  }, [html, css, js, setSrcDoc]);

  // Update theme when darkMode changes
  useEffect(() => {
    setMonacoTheme(darkMode ? "vs-dark" : "vs");
  }, [darkMode]);

  // Feature 1: Tab System - Switch between HTML, CSS, and JavaScript editors
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Feature 2: Monaco Editor Integration with appropriate settings for each language
  const getEditorByTab = () => {
    const commonOptions = {
      minimap: { enabled: true, scale: 0.5, side: "right" },
      fontSize: 14,
      wordWrap: "on",
      automaticLayout: true,
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      roundedSelection: false,
      padding: { top: 10 },
      cursorBlinking: "smooth",
      smoothScrolling: true,
      cursorSmoothCaretAnimation: "on",
      renderLineHighlight: "all",
      fontFamily: "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
      fontLigatures: true,
    };

    switch (currentTab) {
      case 0:
        return (
          <Editor
            height="100%"
            defaultLanguage="html"
            value={html}
            onChange={setHtml}
            theme={monacoTheme}
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
            height="100%"
            defaultLanguage="css"
            value={css}
            onChange={setCss}
            theme={monacoTheme}
            options={{
              ...commonOptions,
              colorDecorators: true,
            }}
          />
        );
      case 2:
        return (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={js}
            onChange={setJs}
            theme={monacoTheme}
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
    let language = "";

    switch (currentTab) {
      case 0:
        codeToCopy = html;
        language = "HTML";
        break;
      case 1:
        codeToCopy = css;
        language = "CSS";
        break;
      case 2:
        codeToCopy = js;
        language = "JavaScript";
        break;
      default:
        return;
    }

    navigator.clipboard.writeText(codeToCopy).then(
      () => {
        showSnackbar(`${language} code copied to clipboard`, "success");
      },
      () => {
        showSnackbar("Failed to copy code", "error");
      }
    );
  };

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle editor fullscreen
  const handleToggleEditorExpanded = () => {
    setEditorExpanded(!editorExpanded);
    if (previewExpanded) setPreviewExpanded(false);
    setLayout(!editorExpanded ? "code-focus" : "split");
  };

  // Toggle preview fullscreen
  const handleTogglePreviewExpanded = () => {
    setPreviewExpanded(!previewExpanded);
    if (editorExpanded) setEditorExpanded(false);
    setLayout(!previewExpanded ? "preview-focus" : "split");
  };

  // Handle layout changes
  const handleSetLayout = (newLayout) => {
    setLayout(newLayout);
    setEditorExpanded(newLayout === "code-focus");
    setPreviewExpanded(newLayout === "preview-focus");
    setViewMenuAnchor(null);
  };

  // Handle view menu
  const handleViewMenuOpen = (event) => {
    setViewMenuAnchor(event.currentTarget);
  };

  const handleViewMenuClose = () => {
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

  // Animation for tab panels
  const TabContent = ({ index, value, children }) => {
    return (
      <TabPanel
        role="tabpanel"
        hidden={value !== index}
        id={`editor-tabpanel-${index}`}
        aria-labelledby={`editor-tab-${index}`}
        sx={{ height: "100%" }}
      >
        {value === index && (
          <Zoom
            in={value === index}
            style={{ transitionDelay: value === index ? "100ms" : "0ms" }}
          >
            <Box sx={{ height: "100%" }}>{children}</Box>
          </Zoom>
        )}
      </TabPanel>
    );
  };

  // Get the appropriate icon for each tab
  const getTabIcon = (index) => {
    switch (index) {
      case 0:
        return <HtmlIcon />;
      case 1:
        return <CssIcon />;
      case 2:
        return <JavascriptIcon />;
      default:
        return null;
    }
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
      <GlassAppBar position="static" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <LogoText variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <CodeIcon /> CodeStudio
          </LogoText>

          <Tooltip title="View options">
            <IconButton color="inherit" onClick={handleViewMenuOpen}>
              <ViewQuiltIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={viewMenuAnchor}
            open={Boolean(viewMenuAnchor)}
            onClose={handleViewMenuClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: darkMode
                  ? "rgba(15, 23, 42, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem onClick={() => handleSetLayout("split")}>
              Split View
            </MenuItem>
            <MenuItem onClick={() => handleSetLayout("code-focus")}>
              Code Focus
            </MenuItem>
            <MenuItem onClick={() => handleSetLayout("preview-focus")}>
              Preview Focus
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleDeviceFrameChange("none")}>
              <ListItemIcon>
                <TvIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>No Frame</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDeviceFrameChange("mobile")}>
              <ListItemIcon>
                <SmartphoneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mobile Frame</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDeviceFrameChange("tablet")}>
              <ListItemIcon>
                <TabletIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Tablet Frame</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDeviceFrameChange("laptop")}>
              <ListItemIcon>
                <LaptopIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Laptop Frame</ListItemText>
            </MenuItem>
          </Menu>

          <Tooltip
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton
              color="inherit"
              onClick={handleToggleDarkMode}
              sx={{
                color: darkMode ? "#f9fafb" : "#1e293b",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "rotate(30deg)" },
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Run code">
            <CircleIconButton
              onClick={handleForceUpdate}
              aria-label="run code"
              sx={{ ml: 1 }}
            >
              <PlayArrowIcon />
            </CircleIconButton>
          </Tooltip>
        </Toolbar>
      </GlassAppBar>

      <Box
        sx={{ flexGrow: 1, display: "flex", overflow: "hidden", p: 2, gap: 2 }}
      >
        {/* Editor Section */}
        <GlassPaper
          elevation={3}
          sx={{
            display: layout === "preview-focus" ? "none" : "flex",
            flexDirection: "column",
            flex: layout === "code-focus" ? 1 : 0.5,
            overflow: "hidden",
          }}
          ref={editorContainerRef}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: darkMode
                ? "1px solid rgba(255, 255, 255, 0.05)"
                : "1px solid rgba(0, 0, 0, 0.05)",
              backgroundColor: darkMode
                ? "rgba(15, 23, 42, 0.5)"
                : "rgba(255, 255, 255, 0.8)",
            }}
          >
            <StyledTabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="editor tabs"
              variant="fullWidth"
              sx={{ flex: 1 }}
            >
              <StyledTab
                icon={getTabIcon(0)}
                label="HTML"
                iconPosition="start"
              />
              <StyledTab
                icon={getTabIcon(1)}
                label="CSS"
                iconPosition="start"
              />
              <StyledTab icon={getTabIcon(2)} label="JS" iconPosition="start" />
            </StyledTabs>

            <Box sx={{ display: "flex", px: 1 }}>
              <Tooltip title="Copy code">
                <IconButton
                  size="small"
                  onClick={handleCopyCode}
                  sx={{ mr: 1 }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={editorExpanded ? "Exit fullscreen" : "Fullscreen"}
              >
                <IconButton size="small" onClick={handleToggleEditorExpanded}>
                  {editorExpanded ? (
                    <FullscreenExitIcon fontSize="small" />
                  ) : (
                    <FullscreenIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <EditorWrapper expanded={editorExpanded}>
            <TabContent index={0} value={currentTab}>
              {getEditorByTab()}
            </TabContent>
            <TabContent index={1} value={currentTab}>
              {getEditorByTab()}
            </TabContent>
            <TabContent index={2} value={currentTab}>
              {getEditorByTab()}
            </TabContent>
          </EditorWrapper>
        </GlassPaper>

        {/* Preview Section */}
        <GlassPaper
          elevation={3}
          sx={{
            display: layout === "code-focus" ? "none" : "flex",
            flexDirection: "column",
            flex: layout === "preview-focus" ? 1 : 0.5,
            overflow: "hidden",
          }}
          ref={previewContainerRef}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: darkMode
                ? "1px solid rgba(255, 255, 255, 0.05)"
                : "1px solid rgba(0, 0, 0, 0.05)",
              backgroundColor: darkMode
                ? "rgba(15, 23, 42, 0.5)"
                : "rgba(255, 255, 255, 0.8)",
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Preview
            </Typography>

            <Box sx={{ display: "flex" }}>
              <Tooltip title="Download project">
                <IconButton
                  size="small"
                  onClick={handleDownloadProject}
                  sx={{ mr: 1 }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Reset to default">
                <IconButton size="small" onClick={handleReset} sx={{ mr: 1 }}>
                  <RestartAltIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={previewExpanded ? "Exit fullscreen" : "Fullscreen"}
              >
                <IconButton size="small" onClick={handleTogglePreviewExpanded}>
                  {previewExpanded ? (
                    <FullscreenExitIcon fontSize="small" />
                  ) : (
                    <FullscreenIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <PreviewContainer deviceFrame={deviceFrame}>
              <iframe
                title="preview"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  borderRadius: deviceFrame === "none" ? 0 : "4px",
                  backgroundColor: "#fff",
                }}
              />
            </PreviewContainer>
          </Box>
        </GlassPaper>
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

// import React, { useEffect, useRef } from "react";
// import { Box, IconButton, Tooltip } from "@mui/material";
// import HtmlIcon from "@mui/icons-material/Html";
// import CssIcon from "@mui/icons-material/Css";
// import JavascriptIcon from "@mui/icons-material/Javascript";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import GlassPaper from "./subcomponents/GlassPaper";
// import StyledTabs from "./subcomponents/StyledTabs";
// import StyledTab from "./subcomponents/StyledTab";
// import useEditorStore from "../store/useEditorStore";

// // Import CodeMirror as a single import to avoid multiple instances
// import * as CM from "./codemirror-bundle"; // You'll need to create this file - see below

// const CodeMirrorEditor = ({
//   value,
//   onChange,
//   language,
//   theme,
//   height = "100vh",
// }) => {
//   const editorRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Don't do anything if container is not available
//     if (!containerRef.current) return;

//     // Clean up previous editor
//     if (editorRef.current) {
//       editorRef.current.destroy();
//       editorRef.current = null;
//     }

//     // Simple extension array to avoid type issues
//     const extensions = [];

//     // Add basic setup
//     extensions.push(CM.basicSetup);

//     // Add keymaps
//     extensions.push(CM.keymap.of([...CM.defaultKeymap, CM.indentWithTab]));

//     // Add line wrapping
//     extensions.push(CM.EditorView.lineWrapping);

//     // Add listener for changes
//     extensions.push(
//       CM.EditorView.updateListener.of((v) => {
//         if (v.docChanged) {
//           onChange(v.state.doc.toString());
//         }
//       })
//     );

//     // Add theme if dark
//     if (theme === "dark") {
//       extensions.push(CM.oneDark);
//     }

//     // Add language extension
//     switch (language) {
//       case "html":
//         extensions.push(CM.html());
//         break;
//       case "css":
//         extensions.push(CM.css());
//         break;
//       case "javascript":
//         extensions.push(CM.javascript());
//         break;
//       default:
//         return null;
//     }

//     try {
//       // Create editor state
//       const state = CM.EditorState.create({
//         doc: value || "",
//         extensions,
//       });

//       // Create editor view
//       editorRef.current = new CM.EditorView({
//         state,
//         parent: containerRef.current,
//       });
//     } catch (err) {
//       console.error("CodeMirror initialization error:", err);
//     }

//     // Cleanup function
//     return () => {
//       if (editorRef.current) {
//         editorRef.current.destroy();
//       }
//     };
//   }, [language, theme, onChange]); // Deliberately omit value to prevent recreation

//   // Update content when value changes
//   useEffect(() => {
//     if (editorRef.current && value !== undefined) {
//       const currentValue = editorRef.current.state.doc.toString();
//       if (currentValue !== value) {
//         editorRef.current.dispatch({
//           changes: {
//             from: 0,
//             to: editorRef.current.state.doc.length,
//             insert: value,
//           },
//         });
//       }
//     }
//   }, [value]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         height: height,
//         overflow: "auto",
//         border: "1px solid #ddd",
//         width: "100%",
//       }}
//     />
//   );
// };

// const EditorSection = ({ showSnackbar }) => {
//   const {
//     html: htmlContent,
//     css: cssContent,
//     js,
//     setHtml,
//     setCss,
//     setJs,
//     darkMode,
//     currentTab,
//     setCurrentTab,
//     editorExpanded,
//     setEditorExpanded,
//     previewExpanded,
//     setPreviewExpanded,
//     layout,
//     setLayout,
//   } = useEditorStore();

//   const handleTabChange = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const handleCopyCode = () => {
//     let codeToCopy = "";
//     let language = "";

//     switch (currentTab) {
//       case 0:
//         codeToCopy = htmlContent;
//         language = "HTML";
//         break;
//       case 1:
//         codeToCopy = cssContent;
//         language = "CSS";
//         break;
//       case 2:
//         codeToCopy = js;
//         language = "JavaScript";
//         break;
//       default:
//         return;
//     }

//     navigator.clipboard.writeText(codeToCopy).then(
//       () => {
//         showSnackbar(`${language} code copied to clipboard`, "success");
//       },
//       () => {
//         showSnackbar("Failed to copy code", "error");
//       }
//     );
//   };

//   const handleToggleEditorExpanded = () => {
//     setEditorExpanded(!editorExpanded);
//     if (previewExpanded) setPreviewExpanded(false);
//     setLayout(!editorExpanded ? "code-focus" : "split");
//   };

//   const getTabIcon = (index) => {
//     switch (index) {
//       case 0:
//         return <HtmlIcon />;
//       case 1:
//         return <CssIcon />;
//       case 2:
//         return <JavascriptIcon />;
//       default:
//         return null;
//     }
//   };

//   const handleCodeChange = (newCode) => {
//     switch (currentTab) {
//       case 0:
//         setHtml(newCode);
//         break;
//       case 1:
//         setCss(newCode);
//         break;
//       case 2:
//         setJs(newCode);
//         break;
//       default:
//         break;
//     }
//   };

//   const getCurrentValue = () => {
//     switch (currentTab) {
//       case 0:
//         return htmlContent;
//       case 1:
//         return cssContent;
//       case 2:
//         return js;
//       default:
//         return "";
//     }
//   };

//   const getCurrentLanguage = () => {
//     switch (currentTab) {
//       case 0:
//         return "html";
//       case 1:
//         return "css";
//       case 2:
//         return "javascript";
//       default:
//         return "";
//     }
//   };

//   return (
//     <GlassPaper
//       elevation={3}
//       sx={{
//         display: layout === "preview-focus" ? "none" : "flex",
//         flexDirection: "column",
//         flex: layout === "code-focus" ? 1 : 0.5,
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: darkMode
//             ? "1px solid rgba(255, 255, 255, 0.05)"
//             : "1px solid rgba(0, 0, 0, 0.05)",
//           backgroundColor: darkMode
//             ? "rgba(15, 23, 42, 0.5)"
//             : "rgba(255, 255, 255, 0.8)",
//         }}
//       >
//         <StyledTabs
//           value={currentTab}
//           onChange={handleTabChange}
//           aria-label="editor tabs"
//           variant="fullWidth"
//           sx={{ flex: 1 }}
//         >
//           <StyledTab icon={getTabIcon(0)} label="HTML" iconPosition="start" />
//           <StyledTab icon={getTabIcon(1)} label="CSS" iconPosition="start" />
//           <StyledTab icon={getTabIcon(2)} label="JS" iconPosition="start" />
//         </StyledTabs>

//         <Box sx={{ display: "flex", px: 1 }}>
//           <Tooltip title="Copy code">
//             <IconButton size="small" onClick={handleCopyCode} sx={{ mr: 1 }}>
//               <ContentCopyIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title={editorExpanded ? "Exit fullscreen" : "Fullscreen"}>
//             <IconButton size="small" onClick={handleToggleEditorExpanded}>
//               {editorExpanded ? (
//                 <FullscreenExitIcon fontSize="small" />
//               ) : (
//                 <FullscreenIcon fontSize="small" />
//               )}
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           height: "100%",
//           flex: 1,
//           display: "flex",
//         }}
//       >
//         <CodeMirrorEditor
//           value={getCurrentValue()}
//           onChange={handleCodeChange}
//           language={getCurrentLanguage()}
//           theme={darkMode ? "dark" : "light"}
//           height="100%"
//         />
//       </Box>
//     </GlassPaper>
//   );
// };

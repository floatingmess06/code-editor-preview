// export default EditorSection;
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GlassPaper from "./subcomponents/GlassPaper";
import StyledTabs from "./subcomponents/StyledTabs";
import StyledTab from "./subcomponents/StyledTab";
import useEditorStore from "../store/useEditorStore";

// Import the React CodeMirror component
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const EditorSection = ({ showSnackbar }) => {
  const {
    html: htmlContent,
    css: cssContent,
    js,
    setHtml,
    setCss,
    setJs,
    darkMode,
    currentTab,
    setCurrentTab,
    editorExpanded,
    setEditorExpanded,
    previewExpanded,
    setPreviewExpanded,
    layout,
    setLayout,
  } = useEditorStore();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCopyCode = () => {
    let codeToCopy = "";
    let language = "";

    switch (currentTab) {
      case 0:
        codeToCopy = htmlContent;
        language = "HTML";
        break;
      case 1:
        codeToCopy = cssContent;
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

  const handleToggleEditorExpanded = () => {
    setEditorExpanded(!editorExpanded);
    if (previewExpanded) setPreviewExpanded(false);
    setLayout(!editorExpanded ? "code-focus" : "split");
  };

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

  const handleCodeChange = (value) => {
    switch (currentTab) {
      case 0:
        setHtml(value);
        break;
      case 1:
        setCss(value);
        break;
      case 2:
        setJs(value);
        break;
      default:
        break;
    }
  };

  const getCurrentValue = () => {
    switch (currentTab) {
      case 0:
        return htmlContent;
      case 1:
        return cssContent;
      case 2:
        return js;
      default:
        return "";
    }
  };

  const getLanguageExtension = () => {
    switch (currentTab) {
      case 0:
        return html();
      case 1:
        return css();
      case 2:
        return javascript();
      default:
        return null;
    }
  };

  return (
    <GlassPaper
      elevation={3}
      sx={{
        display: layout === "preview-focus" ? "none" : "flex",
        flexDirection: "column",
        flex: layout === "code-focus" ? 1 : 0.5,
        overflow: "hidden",
      }}
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
          <StyledTab icon={getTabIcon(0)} label="HTML" iconPosition="start" />
          <StyledTab icon={getTabIcon(1)} label="CSS" iconPosition="start" />
          <StyledTab icon={getTabIcon(2)} label="JS" iconPosition="start" />
        </StyledTabs>

        <Box sx={{ display: "flex", px: 1 }}>
          <Tooltip title="Copy code">
            <IconButton size="small" onClick={handleCopyCode} sx={{ mr: 1 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={editorExpanded ? "Exit fullscreen" : "Fullscreen"}>
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

      <Box
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <CodeMirror
          value={getCurrentValue()}
          onChange={handleCodeChange}
          extensions={[getLanguageExtension()]}
          theme={darkMode ? oneDark : undefined}
          height="100vh"
          width="100vh"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </Box>
    </GlassPaper>
  );
};

export default EditorSection;
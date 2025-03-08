import { useRef, useEffect, useCallback } from "react";
import GlassPaper from "../components/subcomponents/GlassPaper";
import StyledTabs from "../components/subcomponents/StyledTabs";
import StyledTab from "../components/subcomponents/StyledTab";
import TabPanel from "../components/subcomponents/TabPanel";
import EditorWrapper from "../components/EditorWrapper";
import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useEditorStore from "../store/useEditorStore";
import Editor from "@monaco-editor/react";

const EditorSection = ({ showSnackbar }) => {
  const {
    html,
    css,
    js,
    setHtml,
    setCss,
    setJs,
    monacoTheme,
    layout,
    setLayout,
    darkMode,
    currentTab,
    setCurrentTab,
    editorExpanded,
    setEditorExpanded,
    previewExpanded,
    setPreviewExpanded,
  } = useEditorStore();
  // const [
  //   html,
  //   css,
  //   js,
  //   setHtml,
  //   setCss,
  //   setJs,
  //   monacoTheme,
  //   layout,
  //   setLayout,
  //   darkMode,
  //   currentTab,
  //   setCurrentTab,
  //   editorExpanded,
  //   setEditorExpanded,
  //   previewExpanded,
  //   setPreviewExpanded,
  // ] = useEditorStore((state) => {
  //   return [
  //     state.html,
  //     state.css,
  //     state.js,
  //     state.setHtml,
  //     state.setCss,
  //     state.setJs,
  //     state.monacoTheme,
  //     state.layout,
  //     state.setLayout,
  //     state.darkMode,
  //     state.currentTab,
  //     state.setCurrentTab,
  //     state.editorExpanded,
  //     state.setEditorExpanded,
  //     state.previewExpanded,
  //     state.setPreviewExpanded,
  //   ];
  // });

  const handleHtmlChange = useCallback((value) => setHtml(value), [setHtml]);
  const handleCssChange = useCallback((value) => setCss(value), [setCss]);
  const handleJsChange = useCallback((value) => setJs(value), [setJs]);
  const editorContainerRef = useRef(null);
  useEffect(() => {
    const currentEditorContainer = editorContainerRef.current;
    return () => {
      if (currentEditorContainer && currentEditorContainer.dispose) {
        currentEditorContainer.dispose();
      }
    };
  }, []);

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

  // Feature 1: Tab System - Switch between HTML, CSS, and JavaScript editors
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Feature 2: Monaco Editor Integration with appropriate settings for each language
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
            height="100vh"
            defaultLanguage="html"
            value={html}
            onChange={handleHtmlChange}
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
            height="100vh"
            defaultLanguage="css"
            value={css}
            onChange={handleCssChange}
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
            height="100vh"
            defaultLanguage="javascript"
            value={js}
            onChange={handleJsChange}
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

  // Toggle editor fullscreen
  const handleToggleEditorExpanded = () => {
    setEditorExpanded(!editorExpanded);
    if (previewExpanded) setPreviewExpanded(false);
    setLayout(!editorExpanded ? "code-focus" : "split");
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

      <EditorWrapper expanded={editorExpanded}>
        {/* <TabContent index={0} value={currentTab}>
          {getEditorByTab()}
        </TabContent>
        <TabContent index={1} value={currentTab}>
          {getEditorByTab()}
        </TabContent>
        <TabContent index={2} value={currentTab}>
          {getEditorByTab()}
        </TabContent> */}
        <TabContent index={0} value={currentTab}>
          {currentTab === 0 && (
            <Editor
              height="100vh"
              defaultLanguage="html"
              value={html}
              onChange={handleHtmlChange}
              theme={monacoTheme}
              options={commonOptions}
            />
          )}
        </TabContent>
        <TabContent index={1} value={currentTab}>
          {currentTab === 1 && (
            <Editor
              height="100vh"
              defaultLanguage="css"
              value={css}
              onChange={handleCssChange}
              theme={monacoTheme}
              options={commonOptions}
            />
          )}
        </TabContent>
        <TabContent index={2} value={currentTab}>
          {currentTab === 2 && (
            <Editor
              height="100vh"
              defaultLanguage="javascript"
              value={js}
              onChange={handleJsChange}
              theme={monacoTheme}
              options={commonOptions}
            />
          )}
        </TabContent>
      </EditorWrapper>
    </GlassPaper>
  );
};
export default EditorSection;

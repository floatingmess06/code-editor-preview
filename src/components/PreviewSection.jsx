import { useRef } from "react";
import GlassPaper from "./subcomponents/GlassPaper";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PreviewContainer from "./PreviewContainer";
import useEditorStore from "../store/useEditorStore";
const PreviewSection = ({ handleReset, handleDownloadProject }) => {
  const {
    layout,
    darkMode,
    srcDoc,
    previewExpanded,
    deviceFrame,
    setPreviewExpanded,
    editorExpanded,
    setEditorExpanded,
    setLayout,
 } = useEditorStore();
  // const [
  //   layout,
  //   darkMode,
  //   srcDoc,
  //   previewExpanded,
  //   deviceFrame,
  //   setPreviewExpanded,
  //   editorExpanded,
  //   setEditorExpanded,
  //   setLayout,
  // ] = useEditorStore((state) => [
  //   state.layout,
  //   state.darkMode,
  //   state.srcDoc,
  //   state.previewExpanded,
  //   state.deviceFrame,
  //   state.setPreviewExpanded,
  //   state.editorExpanded,
  //   state.setLayout,
  // ]);

  const previewContainerRef = useRef(null);

  // Toggle preview fullscreen
  const handleTogglePreviewExpanded = () => {
    setPreviewExpanded(!previewExpanded);
    if (editorExpanded) setEditorExpanded(false);
    setLayout(!previewExpanded ? "preview-focus" : "split");
  };

  return (
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

          <Tooltip title={previewExpanded ? "Exit fullscreen" : "Fullscreen"}>
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
  );
};
export default PreviewSection;

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const EditorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ theme, expanded }) => ({
  height: expanded ? "calc(100vh - 64px)" : "40vh",
  transition: "height 0.3s ease",
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

export default EditorWrapper;

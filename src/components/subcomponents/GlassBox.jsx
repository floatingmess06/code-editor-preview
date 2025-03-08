import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const GlassBox = styled(Box)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
}));

export default GlassBox;

import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

export default GlassAppBar;

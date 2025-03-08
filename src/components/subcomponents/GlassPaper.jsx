import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
}));


export default GlassPaper;

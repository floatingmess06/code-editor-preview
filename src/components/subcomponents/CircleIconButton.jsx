import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const CircleIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50%",
  padding: 8,
  color: "white",
  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
  "&:hover": {
    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    transform: "scale(1.1)",
  },
  transition: "all 0.2s",
}));

export default CircleIconButton;

import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "0.9rem",
  minHeight: 48,
  transition: "all 0.2s",
  "&.Mui-selected": {
    color: "#38bdf8",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
}));

export default StyledTab;
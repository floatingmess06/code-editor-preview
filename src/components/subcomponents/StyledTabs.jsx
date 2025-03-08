import { styled } from "@mui/material/styles";
import { Tabs } from "@mui/material";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    height: 3,
    background: "linear-gradient(to right, #38bdf8, #818cf8)",
  },
}));

export default StyledTabs;

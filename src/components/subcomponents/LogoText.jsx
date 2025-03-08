import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const LogoText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #38bdf8, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  "& svg": {
    marginRight: theme.spacing(1),
  },
}));
export default LogoText;

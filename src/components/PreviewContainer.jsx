import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const PreviewContainer = styled(Box)(({ theme, deviceFrame }) => {
  const frames = {
    mobile: {
      width: "375px",
      height: "667px",
      borderRadius: "20px",
      padding: "15px",
    },
    tablet: {
      width: "768px",
      height: "1024px",
      borderRadius: "12px",
      padding: "10px",
    },
    laptop: {
      width: "100%",
      height: "100%",
      borderRadius: "6px",
      padding: "0",
    },
    desktop: {
      width: "100%",
      height: "100%",
      borderRadius: "0",
      padding: "0",
    },
  };

  return {
    position: "relative",
    width: deviceFrame === "none" ? "100%" : frames[deviceFrame].width,
    height: deviceFrame === "none" ? "100%" : frames[deviceFrame].height,
    maxWidth: "100%",
    maxHeight: "calc(100vh - 180px)",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius:
      deviceFrame === "none" ? "6px" : frames[deviceFrame].borderRadius,
    border: deviceFrame === "none" ? "none" : "10px solid #222",
    boxShadow:
      deviceFrame === "none" ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    background: "#000",
    transition: "all 0.3s ease",
  };
});

export default PreviewContainer;
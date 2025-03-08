import GlassAppBar from "./subcomponents/GlassAppBar";
import LogoText from "./subcomponents/LogoText";
import CircleIconButton from "./subcomponents/CircleIconButton";
import {
  Toolbar,
  IconButton,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TabletIcon from "@mui/icons-material/Tablet";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useEditorStore from "../store/useEditorStore";

const NavigationBar = ({
  handleForceUpdate,
  handleSetLayout,
  handleDeviceFrameChange,
  handleToggleDarkMode,
}) => {
  const { setDrawerOpen, viewMenuAnchor, darkMode, setViewMenuAnchor } =
    useEditorStore();
  // const [setDrawerOpen, viewMenuAnchor, darkMode, setViewMenuAnchor] =
  //   useEditorStore((state) => [
  //     state.setDrawerOpen,
  //     state.viewMenuAnchor,
  //     state.darkMode,
  //     state.setViewMenuAnchor,
  //   ]);

  const handleViewMenuClose = () => {
    setViewMenuAnchor(null);
  };

  // Handle view menu
  const handleViewMenuOpen = (event) => {
    setViewMenuAnchor(event.currentTarget);
  };

  return (
    <GlassAppBar position="static" color="default">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <LogoText variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <CodeIcon /> CodeStudio
        </LogoText>

        <Tooltip title="View options">
          <IconButton color="inherit" onClick={handleViewMenuOpen}>
            <ViewQuiltIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={viewMenuAnchor}
          open={Boolean(viewMenuAnchor)}
          onClose={handleViewMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: darkMode
                ? "rgba(15, 23, 42, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <MenuItem onClick={() => handleSetLayout("split")}>
            Split View
          </MenuItem>
          <MenuItem onClick={() => handleSetLayout("code-focus")}>
            Code Focus
          </MenuItem>
          <MenuItem onClick={() => handleSetLayout("preview-focus")}>
            Preview Focus
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleDeviceFrameChange("none")}>
            <ListItemIcon>
              <TvIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>No Frame</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleDeviceFrameChange("mobile")}>
            <ListItemIcon>
              <SmartphoneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mobile Frame</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleDeviceFrameChange("tablet")}>
            <ListItemIcon>
              <TabletIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Tablet Frame</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleDeviceFrameChange("laptop")}>
            <ListItemIcon>
              <LaptopIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Laptop Frame</ListItemText>
          </MenuItem>
        </Menu>

        <Tooltip
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <IconButton
            color="inherit"
            onClick={handleToggleDarkMode}
            sx={{
              color: darkMode ? "#f9fafb" : "#1e293b",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "rotate(30deg)" },
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Run code">
          <CircleIconButton
            onClick={handleForceUpdate}
            aria-label="run code"
            sx={{ ml: 1 }}
          >
            <PlayArrowIcon />
          </CircleIconButton>
        </Tooltip>
      </Toolbar>
    </GlassAppBar>
  );
};
export default NavigationBar;

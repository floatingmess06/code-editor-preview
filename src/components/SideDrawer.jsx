import React from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  MenuItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Select from "@mui/material/Select";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useEditorStore from "../store/useEditorStore";
import DownloadIcon from "@mui/icons-material/Download";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const SideDrawer = ({
  LogoText,
  handleReset,
  handleDeviceFrameChange,
  handleForceUpdate,
  handleDownloadProject,
  handleToggleDarkMode,
  handleSetLayout,
}) => {
  const { layout, deviceFrame, darkMode, drawerOpen, setDrawerOpen } =
    useEditorStore();
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box
        sx={{
          width: 280,
          p: 3,
          height: "100%",
          background: darkMode
            ? "linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(23, 36, 64, 0.95))"
            : "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(240, 245, 255, 0.95))",
          color: darkMode ? "#f8fafc" : "#334155",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <LogoText variant="h5" sx={{ display: "flex", alignItems: "center" }}>
            <CodeIcon sx={{ mr: 1 }} /> CodeStudio
          </LogoText>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
          ACTIONS
        </Typography>

        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton onClick={handleReset}>
              <ListItemIcon>
                <RestartAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Reset Code" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton onClick={handleForceUpdate}>
              <ListItemIcon>
                <PlayArrowIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Run Code" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton onClick={handleDownloadProject}>
              <ListItemIcon>
                <DownloadIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Download Project" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 3, opacity: 0.2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
          SETTINGS
        </Typography>

        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton onClick={handleToggleDarkMode}>
              <ListItemIcon>
                {darkMode ? (
                  <LightModeIcon color="primary" />
                ) : (
                  <DarkModeIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText primary="Layout" />
            <Select
              value={layout}
              onChange={(e) => handleSetLayout(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="split">Split View</MenuItem>
              <MenuItem value="code-focus">Code Focus</MenuItem>
              <MenuItem value="preview-focus">Preview Focus</MenuItem>
            </Select>
          </ListItem>

          <ListItem>
            <ListItemText primary="Device Frame" />
            <Select
              value={deviceFrame}
              onChange={(e) => handleDeviceFrameChange(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="laptop">Laptop</MenuItem>
            </Select>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;

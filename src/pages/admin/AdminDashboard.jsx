import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ViewCards from "./ViewCards";
import videos from "../../data/videos";

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const categories = ["Comedy", "Action", "Drama"];
  const categoryCounts = categories.map((category) => ({
    category,
    count: videos.filter((video) => video.category === category).length,
  }));

  const drawer = (
    <List sx={{ paddingTop: 2 }}>
      <ListItem
        button
        component={Link}
        to="/"
        sx={{
          color: "var(--secondary-color)",
          padding: "16px",
          justifyContent: "center",
          marginBottom: 2,
          border: "1px solid var(--secondary-color)",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <ListItemText primary="User Home" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/admin"
        sx={{
          color: "var(--secondary-color)",
          padding: "16px",
          justifyContent: "center",
          marginBottom: 2,
          border: "1px solid var(--secondary-color)",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <ListItemText primary="Dashboard" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/admin/manage-videos"
        sx={{
          color: "var(--secondary-color)",
          padding: "16px",
          justifyContent: "center",
          marginBottom: 2,
          border: "1px solid var(--secondary-color)",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <ListItemText primary="Manage Videos" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/admin/upload-video"
        sx={{
          color: "var(--secondary-color)",
          padding: "16px",
          justifyContent: "center",
          marginBottom: 2,
          border: "1px solid var(--secondary-color)",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <ListItemText primary="Upload Video" sx={{ textAlign: "center" }} />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginLeft: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "var(--primary-color)",
              color: "var(--secondary-color)",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {location.pathname === "/admin" && <ViewCards />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;

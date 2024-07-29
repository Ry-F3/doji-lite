import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onOpenNav }) {
  return (
    <AppBar></AppBar>
    //   position="sticky"
    //   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    //   <Toolbar>
    //     <IconButton
    //       color="inherit"
    //       edge="start"
    //       onClick={onOpenNav}
    //       sx={{ mr: 2, display: { lg: "none" } }}>
    //       <MenuIcon />
    //     </IconButton>
    //     {/* Add more header content here */}
    //   </Toolbar>
    // </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

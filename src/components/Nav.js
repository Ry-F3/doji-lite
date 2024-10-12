import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import { useResponsive } from "../hooks/use-responsive";
import { usePathname } from "../routes/use-pathname";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { NAV } from "../config/config-layout";
import {
  authenticatedNavConfig,
  unauthenticatedNavConfig,
} from "../config/config-navigation"; // Correctly import named exports
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Nav({ openNav, onCloseNav }) {
  // const pathname = usePathname();
  const isLgUp = useResponsive("up", "lg");
  const currentUser = useCurrentUser(); // Get current user context
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = useCallback(async () => {
    console.log("Sign out initiated");
    try {
      await axios.post("dj-rest-auth/logout/");
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      console.log("Redirecting to /signin");
      history.push("/signin");
    } catch (err) {
      console.log("Error during sign-out:", err);
    }
  },[setCurrentUser, history]);

  const navConfig = useMemo(() => {
    return currentUser
      ? authenticatedNavConfig(handleSignOut)
      : unauthenticatedNavConfig;
  }, [currentUser, handleSignOut]);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}>
      {isLgUp ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: 1,
            borderColor: "divider",
          }}>
          <Box sx={{ display: "flex", flexDirection: "column", height: 5, p: 5 }}>
            {navConfig.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </Box>
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{ sx: { width: NAV.WIDTH } }}>
          <Box sx={{ display: "flex", flexDirection: "column", height: 5, p: 5 }}>
            {navConfig.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  const handleClick = (event) => {
    if (item.onClick) {
      event.preventDefault(); // Prevent the default anchor behavior if onClick is provided
      item.onClick(); // Call the onClick function
    }
  };

  return (
    <ListItemButton
      component="a"
      href={item.path}
      onClick={handleClick} // Attach the handleClick function
      sx={{
        minHeight: 44,
        borderRadius: 1,
        typography: "body2",
        color: active ? "white.main" : "text.secondary",
        fontSize: "18px", 
        bgcolor: active ? "action.selected" : "transparent",
        "&:hover": {
          bgcolor: active ? "action.hover" : "transparent",
        },
      }}>
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

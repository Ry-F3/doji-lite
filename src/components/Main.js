import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function Main({ children, sx, ...other }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        p: 2,
        ...sx,
      }}
      {...other}>
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

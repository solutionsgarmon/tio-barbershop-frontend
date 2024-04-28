import React from "react";
import Paperbase from "./admin/Paperbase";
import { useEffect } from "react";
import { Box } from "@mui/material";

const Administracion = ({ setShowNavigationBar }) => {
  useEffect(() => {
    setShowNavigationBar(false);
    return () => {
      setShowNavigationBar(true);
    };
  }, []);

  return (
    <Box sx={{ mt: -11, maxWidth: "100%", overflowX: "auto" }}>
      <Paperbase />
    </Box>
  );
};

export default Administracion;

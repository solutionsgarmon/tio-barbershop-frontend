import React from "react";
import Paperbase from "./admin/Paperbase";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../context/AppProvider";
import TableExample from "./admin/TableExample";

const Administracion = ({ setShowNavigationBar }) => {
  const { flagTransparent, setIsLoading } = useAppContext();
  useEffect(() => {
    setShowNavigationBar(false);
    return () => {
      setShowNavigationBar(true);
    };
  }, []);

  return (
    <Box sx={{ mt: -9, maxWidth: "100%", overflowX: "auto" }}>
      <Paperbase />
    </Box>
  );
};

export default Administracion;

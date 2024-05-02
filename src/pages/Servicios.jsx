import { Box, Button } from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";

import { useState } from "react";
import MapFrame from "../components/atoms/MapFrame";
import { useEffect } from "react";
import { getServices } from "../api/gets";

const Servicios = ({ services }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        <h1>Nuestros Servicios</h1>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {services?.map((servicio) => (
          <Box sx={{ m: 2, maxWidth: 500 }}>
            <CardServices servicio={servicio} withButtons={false} />
          </Box>
        ))}
      </Box>
      <MapFrame />
    </Box>
  );
};

export default Servicios;

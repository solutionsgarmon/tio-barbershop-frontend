import { Box, Button } from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";

import { useState } from "react";
import MapFrame from "../components/atoms/MapFrame";
import { useEffect } from "react";
import { getServices } from "../api/gets";
import { Typography } from "antd";

const Servicios = ({ services }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        <h2 style={{ color: "#E2b753 ", fontFamily: "Century Gothic" }}>
          Nuestros Servicios
        </h2>
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

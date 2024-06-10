import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ElementCategoria = ({ image, name }) => {
  return (
    <Box
      sx={{
        py:1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.1)", // Aumenta ligeramente el tamaño al hacer hover
        },
      }}
    >
      <Avatar
        src={image}
        sx={{
          width: { xs: 60, sm: 80 }, // Tamaño del Avatar
          height: { xs: 60, sm: 80 }, // Tamaño del Avatar
          marginBottom: 1, // Espacio entre el Avatar y el Typography
        }}
      />
      <Typography sx={{ color: "white", width: { xs: 90, sm: 100 } }}>
        {name}
      </Typography>
    </Box>
  );
};

export default ElementCategoria;

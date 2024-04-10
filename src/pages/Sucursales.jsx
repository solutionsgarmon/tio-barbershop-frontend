import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import MyMap from "../components/molecules/MyMap";
import ElementListWithImage from "../components/molecules/ElementListWithImage";

const Sucursales = () => {
  const [sucursalSelected, setSucursalSelected] = useState(0);
  const SUCURSALES = [
    {
      coordenadas: { lat: 19.3598, lng: -99.1774 },
      nombre: "Chapultepec",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.4348, lng: -99.1381 },
      nombre: "Zócalo",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.2826, lng: -99.1669 },
      nombre: "Xochimilco",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.282, lng: -99.1255 },
      nombre: "Coyoacán",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.4354, lng: -99.1332 },
      nombre: "Templo Mayor",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.4227, lng: -99.1625 },
      nombre: "Parque México",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.4193, lng: -99.1621 },
      nombre: "Parque España",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
    {
      coordenadas: { lat: 19.4151, lng: -99.1646 },
      nombre: "Parque Lincoln",
      image: "/images/localbarberia.PNG",
      address: "Av. Reforma #123 Col. La comercial, entre Rayon y Colosio",
    },
  ];

  return (
    <Grid container sx={{ p: 2 }}>
      <Grid
        xs={4}
        md={4}
        sx={{
          maxHeight: 600,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "12px",
            height: "12px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "goldenrod",
            borderRadius: "6px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <h2>SUCURSALES</h2>
        {SUCURSALES.map((sucursal, index) => (
          <Box sx={{ m: 1 }}>
            <ElementListWithImage
              setSucursalSelected={setSucursalSelected}
              image={sucursal.image}
              primaryText={sucursal.nombre}
              secondaryText={sucursal.address}
              index={index}
            />
          </Box>
        ))}
      </Grid>
      <Grid xs={8} md={8}>
        <MyMap
          lat={SUCURSALES[sucursalSelected].coordenadas.lat}
          lng={SUCURSALES[sucursalSelected].coordenadas.lng}
        />
      </Grid>
    </Grid>
  );
};

export default Sucursales;

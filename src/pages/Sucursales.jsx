import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import MyMap from "../components/molecules/MyMap";
import ElementListWithImage from "../components/molecules/ElementListWithImage";
import { useAppContext } from "../context/AppProvider";
import CustomSwalModal from "../components/modals/CustomSwalModal";

const Sucursales = () => {
  const { barbershops } = useAppContext();
  const [sucursalSelected, setSucursalSelected] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleCerrarModal = () => {
    console.log("handleCerrarModal");
    setOpenModal(false);
  };

  const handleVerHorario = () => {
    console.log("handleVerHorario");
    setOpenModal(true);
  };

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
        {barbershops.map((barbershop, index) => (
          <Box sx={{ m: 1 }}>
            <ElementListWithImage
              setSucursalSelected={setSucursalSelected}
              image={barbershop.imagen}
              primaryText={barbershop.nombre}
              secondaryText={`${barbershop.direccion.calle},${barbershop.direccion.colonia} ${barbershop.direccion.ciudad}`}
              index={index}
              handleVerHorario={handleVerHorario}
            />
          </Box>
        ))}
      </Grid>
      <Grid xs={8} md={8}>
        <MyMap
          lat={parseFloat(barbershops[sucursalSelected]?.coordenadas.latitud)}
          lng={parseFloat(barbershops[sucursalSelected]?.coordenadas.longitud)}
        />
      </Grid>
      <CustomSwalModal
        horario={barbershops[sucursalSelected]?.horario || {}}
        handleCerrarModal={handleCerrarModal}
        openModal={openModal}
      />
    </Grid>
  );
};

export default Sucursales;

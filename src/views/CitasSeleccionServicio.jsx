import { Box } from "@mui/material";
import React, { useState } from "react";
import CardServices from "../components/cards/CardServices";

const CitasSeleccionBarbero = ({
  setEnableButton,
  setDataCita,
  dataCita,
  services,
}) => {
  const [selected, setSelected] = useState(null);

  const handleSelectCard = (servicio) => {
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      servicio: servicio.nombre,
      id_servicio: servicio._id,
      duracion: servicio.duracion,
      costo: servicio.precio,
    }));
    setEnableButton(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {services?.map(
        (servicio, index) =>
          index % 2 === 0 && (
            <React.Fragment key={servicio.id}>
              <Box sx={{ m: 1, maxWidth: 350 }}>
                <CardServices
                  dataCita={dataCita}
                  servicio={servicio}
                  isSelected={selected === servicio}
                  onSelect={handleSelectCard}
                />
              </Box>
              {index + 1 < services.length && (
                <Box sx={{ m: 1, maxWidth: 350 }}>
                  <CardServices
                    dataCita={dataCita}
                    servicio={services[index + 1]}
                    isSelected={selected === services[index + 1]}
                    onSelect={handleSelectCard}
                  />
                </Box>
              )}
            </React.Fragment>
          )
      )}
    </Box>
  );
};

export default CitasSeleccionBarbero;

import { Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import CardServices from "../components/cards/CardServices";
import { scrollToTop } from "../utils/screen";
import CardSelectectionServices from "../components/cards/CardSelectectionServices";

const CitasSeleccionBarbero = ({
  setEnableButton,
  setDataCita,
  dataCita,
  services,
}) => {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null); // Referencia al contenedor de las tarjetas

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

  useEffect(() => {
    scrollToTop(containerRef.current);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        cursor: "pointer",
      }}
    >
      {services?.map(
        (servicio, index) =>
          index % 2 === 0 && (
            <React.Fragment key={servicio.id}>
              <Box sx={{ m: 1, maxWidth: 350 }}>
                <CardSelectectionServices
                  dataCita={dataCita}
                  servicio={servicio}
                  isSelected={selected === servicio}
                  onSelect={handleSelectCard}
                />
              </Box>
              {index + 1 < services.length && (
                <Box sx={{ m: 1, maxWidth: 350 }}>
                  <CardSelectectionServices
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

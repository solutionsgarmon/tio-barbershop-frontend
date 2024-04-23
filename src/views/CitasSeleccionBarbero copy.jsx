import { Box } from "@mui/material";
import React, { useState } from "react";
import CardServices from "../components/cards/CardServices";

const CitasSeleccionBarbero = ({ setEnableButton, setDataCita, barbers }) => {
  const [selected, setSelected] = useState(null);

  const handleSelectCard = (barbero) => {
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      barbero: barbero.nombre,
      id_barbero: barbero._id,
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
      {barbers?.map(
        (barbero, index) =>
          index % 2 === 0 && (
            <React.Fragment key={barbero.id}>
              <Box sx={{ m: 1, maxWidth: 350 }}>
                <CardServices
                  barbero={barbero}
                  isSelected={selected === barbero}
                  onSelect={handleSelectCard}
                />
              </Box>
              {index + 1 < barbers.length && (
                <Box sx={{ m: 1, maxWidth: 350 }}>
                  <CardServices
                    barbero={barbers[index + 1]}
                    isSelected={selected === barbers[index + 1]}
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

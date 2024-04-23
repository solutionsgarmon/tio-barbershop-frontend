import { Box } from "@mui/material";
import React, { useState } from "react";
import CardServices from "../components/cards/CardServices";
import { useEffect } from "react";
import CardCitaBarber from "../components/cards/CardCitaBarber";

const CitasSeleccionBarbero = ({
  setEnableButton,
  setDataCita,
  dataCita,
  barbers,
}) => {
  const [selected, setSelected] = useState(null);
  const [barberosLocal, setBarberosLocal] = useState([]);

  useEffect(() => {
    console.log("barberosLocal", barberosLocal);
  }, [barberosLocal]);

  useEffect(() => {
    console.log("barbers", barbers);
    console.log("dataCita.id_barberia", dataCita.id_barberia);
    if (barbers && barbers.length > 0) {
      console.log("barbers", barbers);
      const barberosFiltrados = barbers.filter(
        (barbero) => barbero.barberia_asignada === dataCita.id_barberia
      );
      console.log("barberosFiltrados antes de set", barberosFiltrados);
      setBarberosLocal(barberosFiltrados);
    }
  }, [barbers]);

  const handleSelectCard = (barbero) => {
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      barbero: barbero.nombre,
      id_barbero: barbero._id,
      imagen_barbero: barbero.imagenes[0]?.url,
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
      {barberosLocal?.map(
        (barbero, index) =>
          index % 2 === 0 && (
            <React.Fragment key={barbero.id}>
              <Box sx={{ m: 1, maxWidth: 350 }}>
                <CardCitaBarber
                  barbero={barbero}
                  isSelected={selected === barbero}
                  onSelect={handleSelectCard}
                />
              </Box>
              {index + 1 < barberosLocal.length && (
                <Box sx={{ m: 1, maxWidth: 350 }}>
                  <CardCitaBarber
                    barbero={barberosLocal[index + 1]}
                    isSelected={selected === barberosLocal[index + 1]}
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

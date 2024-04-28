import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Select, MenuItem, Box, Stack } from "@mui/material";
import { getHorarioDisponibleBarber } from "../api/gets";
import { useAppContext } from "../context/AppProvider";
import CalendarSeleccionCita from "../components/atoms/CalendarSeleccionCita";

const CitasSeleccionHora = ({ setEnableButton, dataCita, setDataCita }) => {
  const { setIsLoadingApp } = useAppContext();
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [totalHorasDisponibles, setTotalHorasDisponibles] = useState(null);

  // Obtener todo el horario disponible de los próximos 15 días y las horas disponibles de HOY
  useEffect(() => {
    console.log("useEffect []");
    async function fetchData() {
      const horario_disponible_15_dias = await getHorarioDisponibleBarber(
        dataCita.id_barbero,
        dataCita.id_servicio
      );

      const horario_disponible_hoy =
        horario_disponible_15_dias[dayjs().format("YYYY-MM-DD").toUpperCase()];
      setHorasDisponibles(horario_disponible_hoy);
      setTotalHorasDisponibles(horario_disponible_15_dias);
    }

    fetchData();
  }, []);

  //Este useEffect es el que cambia la data del Select dependiendo de la fecha
  useEffect(() => {
    console.log("useEffect fechaSeleccionada", fechaSeleccionada);
    if (totalHorasDisponibles) {
      const horario_disponible_hoy = totalHorasDisponibles[fechaSeleccionada];
      setHorasDisponibles(horario_disponible_hoy);
    }
  }, [fechaSeleccionada]);

  // Función para manejar el cambio de hora seleccionada
  const handleChangeHora = (event) => {
    const rangoHora = event.target.value;

    setHoraSeleccionada(rangoHora);
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      hora: rangoHora,
    }));
    setEnableButton(true);
  };

  const handleChangeCalendar = (dateSelected) => {
    console.log("[ejecución] handleChangeCalendar()");
    setFechaSeleccionada(dateSelected);
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      fecha: dateSelected,
    }));
  };

  // Función para sumar la duración del corte de cabello a la hora seleccionada
  const sumarDuracion = (hora, duracion) => {
    const [horaStr, minutoStr] = hora.split(":");
    const horaObj = dayjs().hour(Number(horaStr)).minute(Number(minutoStr));
    const horaFinalObj = horaObj.add(duracion, "minute");
    return horaFinalObj.format("HH:mm");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Centrado horizontal
        alignItems: "center", // Centrado vertical
      }}
    >
      <Stack direction={"column"}>
        <CalendarSeleccionCita handleChangeCalendar={handleChangeCalendar} />

        <Select
          value={horaSeleccionada}
          onChange={handleChangeHora}
          displayEmpty
          fullWidth
          sx={{ mt: { xs: -3, md: 0 } }}
        >
          {/* Opción para seleccionar hora */}
          <MenuItem value="" disabled>
            Selecciona una hora
          </MenuItem>
          {/* Mapear las horas en MenuItem */}
          {horasDisponibles.map((hora, index) => (
            <MenuItem key={index} value={hora}>
              {`${hora} - ${sumarDuracion(hora, dataCita.duracion)}`}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </div>
  );
};

export default CitasSeleccionHora;

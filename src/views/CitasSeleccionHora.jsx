import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Calendar from "../components/atoms/Calendar";
import { Select, MenuItem } from "@mui/material";

const horaInicio = 8;
const horaFin = 16;

const CitasSeleccionHora = ({ setEnableButton, dataCita, setDataCita }) => {
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

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

  // Generar el rango de horas disponibles basado en horaInicio y horaFin
  const horasDisponibles = [];
  for (let hora = horaInicio; hora <= horaFin; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 10) {
      horasDisponibles.push(
        `${hora.toString().padStart(2, "0")}:${minuto
          .toString()
          .padStart(2, "0")}`
      );
    }
  }

  // Función para sumar la duración del corte de cabello a la hora seleccionada
  const sumarDuracion = (hora, duracion) => {
    const [horaStr, minutoStr] = hora.split(":");
    const horaObj = dayjs().hour(Number(horaStr)).minute(Number(minutoStr));
    const horaFinalObj = horaObj.add(duracion, "minute");
    return horaFinalObj.format("HH:mm");
  };

  const handleChangeCalendar = (dateSelected) => {
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      fecha: dateSelected,
    }));
  };

  return (
    <div>
      <Calendar handleChangeCalendar={handleChangeCalendar} />

      <div>
        <Select
          value={horaSeleccionada}
          onChange={handleChangeHora}
          displayEmpty
          fullWidth
          sx={{ mt: -10 }}
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
      </div>
    </div>
  );
};

export default CitasSeleccionHora;

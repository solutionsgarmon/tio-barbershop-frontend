import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Select, MenuItem, Box, Stack } from "@mui/material";
import { getHorarioDisponibleBarber } from "../api/gets";
import { useAppContext } from "../context/AppProvider";
import CalendarSeleccionCita from "../components/atoms/CalendarSeleccionCita";

const CitasSeleccionHora = ({ setEnableButton, dataCita, setDataCita }) => {
  const { setIsLoadingApp } = useAppContext();
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    dayjs().format("YYYY-MM-DD").toUpperCase()
  );
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [totalHorasDisponibles, setTotalHorasDisponibles] = useState(null);

  // Obtener todo el horario disponible de los próximos 15 días
  useEffect(() => {
    async function fetchData() {
      setIsLoadingApp(true);
      const horario_disponible_15_dias = await getHorarioDisponibleBarber(
        dataCita.id_barbero,
        dataCita.id_servicio
      );

      console.log("horario_disponible_15_dias", horario_disponible_15_dias);
      console.log("fechaSeleccionada", fechaSeleccionada);
      const horario_disponible_hoy =
        horario_disponible_15_dias[fechaSeleccionada];
      setHorasDisponibles(horario_disponible_hoy);
      setTotalHorasDisponibles(horario_disponible_15_dias);

      setIsLoadingApp(false); // Mover aquí para que se establezca en false después de obtener los datos
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("fechaSeleccionada", fechaSeleccionada);
    if (totalHorasDisponibles) {
      const horario_disponible_hoy = totalHorasDisponibles[fechaSeleccionada];
      setHorasDisponibles(horario_disponible_hoy);
    }
  }, [fechaSeleccionada]);

  // Función para obtener las horas disponibles basadas en la fecha seleccionada y la hora actual
  const obtenerHorasDisponibles = () => {
    const fechaActual = dayjs();
    const fechaSeleccionadaObj = dayjs(fechaSeleccionada);
    let horasDisponiblesActualizadas = [];

    // Si la fecha seleccionada es igual a la fecha actual, filtrar las horas disponibles basadas en la hora actual
    if (fechaSeleccionadaObj.isSame(fechaActual, "day")) {
      const horaActual = fechaActual.hour();
      const minutoActual = fechaActual.minute();

      // Filtrar las horas disponibles que son posteriores a la hora actual
      horasDisponiblesActualizadas = horasDisponibles.filter((hora) => {
        const [horaStr, minutoStr] = hora.split(":");
        const horaDisponible = parseInt(horaStr);
        const minutoDisponible = parseInt(minutoStr);

        // Si la hora disponible es después de la hora actual o es igual pero con minutos posteriores
        return (
          horaDisponible > horaActual ||
          (horaDisponible === horaActual && minutoDisponible > minutoActual)
        );
      });
    } else {
      // Si la fecha seleccionada es diferente a la fecha actual, mostrar todas las horas disponibles
      horasDisponiblesActualizadas = horasDisponibles;
    }

    return horasDisponiblesActualizadas;
  };

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
    setFechaSeleccionada(dateSelected);
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      fecha: dateSelected,
    }));
  };

  // Obtener las horas disponibles basadas en la fecha seleccionada y la hora actual
  const horasDisponiblesActualizadas = obtenerHorasDisponibles();

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
          {horasDisponiblesActualizadas.map((hora, index) => (
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

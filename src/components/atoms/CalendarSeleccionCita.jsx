import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar la localización en español
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { useEffect } from "react";

export default function CalendarSeleccionCita({ handleChangeCalendar }) {
  const [value, setValue] = useState(dayjs());

  const disableDates = (day) => {
    const today = dayjs();
    const maxDate = today.add(14, "day"); // Obtener la fecha máxima permitida (hoy + 14 días)
    return (
      dayjs(day).isBefore(today, "day") || dayjs(day).isAfter(maxDate, "day")
    );
  };

  // useEffect(() => {
  //   const today = dayjs();
  //   const formattedDate = today.format("YYYY-MM-DD").toUpperCase();
  //   handleChangeCalendar(formattedDate);
  // }, []);

  const handleChange = (newValue) => {
    const formattedDate = newValue.format("YYYY-MM-DD").toUpperCase();
    setValue(newValue);
    handleChangeCalendar(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem>
          <DateCalendar
            value={value}
            onChange={(newValue) => handleChange(newValue)}
            shouldDisableDate={disableDates}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

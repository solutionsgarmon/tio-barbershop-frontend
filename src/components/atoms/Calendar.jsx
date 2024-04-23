import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar la localización en español
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { useEffect } from "react";

dayjs.locale("es"); // Establecer la localización en español

export default function Calendar({ handleChangeCalendar }) {
  const [value, setValue] = useState(dayjs());

  useEffect(() => {
    const today = dayjs();
    const formattedDate = today.format("DD/MM/YYYY").toUpperCase();
    handleChangeCalendar(formattedDate);
  }, []);

  const handleChange = (newValue) => {
    const formattedDate = newValue.format("DD/MM/YYYY").toUpperCase();
    setValue(newValue);
    handleChangeCalendar(formattedDate);
  };

  // Función para deshabilitar fechas anteriores a la fecha actual
  const disablePastDates = (day) => {
    return dayjs(day).isBefore(dayjs(), "day");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem>
          <DateCalendar
            value={value}
            onChange={(newValue) => handleChange(newValue)}
            shouldDisableDate={disablePastDates}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

import React, { useState, useEffect } from "react";
import TablaReportes from "./TablaReportes";
import {
  getBarbers,
  getBarbershops,
  getCitas,
  getServices,
} from "../../../api/gets";
import { useAppContext } from "../../../context/AppProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ReportesBarbero = () => {
  const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("TODOS");
  const [selectedBarbero, setSelectedBarbero] = useState("TODOS");
  const [selectedServicio, setSelectedServicio] = useState("TODOS");
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setServices(await getServices());

      const allCitas = await getCitas();
      const citasBarbero = allCitas.filter(
        (cita) => cita.barbero_asignado == sessionDataStorage._id
      );

      // Obtener todas las diferentes fechas de las citas del barbero
      const uniqueDates = Array.from(
        new Set(citasBarbero.map((cita) => cita.fecha_asignada))
      );
      setDates(uniqueDates);

      setCitas(citasBarbero);
      setIsLoading(false);
    }
    setIsLoading(true);

    if (sessionDataStorage) {
      fetchData();
    }
  }, [sessionDataStorage]);

  // Calcular el costo total de los servicios a lo largo del tiempo
  const calcularCostoTotalPorFecha = () => {
    let citasFiltradas = citas;
    if (selectedDateRange !== "TODOS") {
      citasFiltradas = citasFiltradas.filter(
        (cita) => cita.fecha_asignada === selectedDateRange
      );
    }
    if (selectedServicio !== "TODOS") {
      citasFiltradas = citasFiltradas.filter(
        (cita) => cita.nombre_servicio_asignado === selectedServicio
      );
    }

    const citasPorFecha = citasFiltradas.reduce((acc, cita) => {
      const fecha = cita.fecha_asignada;
      const costo = cita.costo;
      if (!acc[fecha]) {
        acc[fecha] = 0;
      }
      acc[fecha] += costo;
      return acc;
    }, {});

    const costoTotalPorFecha = Object.entries(citasPorFecha).map(
      ([fecha, total]) => ({
        fecha,
        Total_Acumulado: total,
      })
    );

    return costoTotalPorFecha;
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const handleBarberoChange = (event) => {
    setSelectedBarbero(event.target.value);
  };

  const handleServicioChange = (event) => {
    setSelectedServicio(event.target.value);
  };

  return (
    <Box>
      <Paper sx={{ mb: 1, p: 2 }}>
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel>Fechas</InputLabel>
          <Select
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            label="Fechas"
          >
            <MenuItem value="TODOS">Todas</MenuItem>
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Servicio</InputLabel>
          <Select
            value={selectedServicio}
            onChange={handleServicioChange}
            label="Servicio"
          >
            <MenuItem value="TODOS">Todos</MenuItem>
            {services.map((service) => (
              <MenuItem key={service._id} value={service.nombre}>
                {service.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ mb: 1 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={calcularCostoTotalPorFecha()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total_Acumulado" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <TablaReportes data={citas} isLoading={isLoadingApp} />
    </Box>
  );
};

export default ReportesBarbero;

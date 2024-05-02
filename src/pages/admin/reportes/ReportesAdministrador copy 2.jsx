import React, { useState, useEffect } from "react";
import TablaReportes from "./TablaReportes";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Stack,
  Box,
  Tooltip as MuiTooltip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";

const ReportesAdministrador = () => {
  const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("TODOS");
  const [selectedStatus, setSelectedStatus] = useState("TODOS");
  const [dates, setDates] = useState([]);
  const [totalGanancias, setTotalGanancias] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setServices(await getServices());

      const allCitas = await getCitas();

      const uniqueDates = Array.from(
        new Set(allCitas.map((cita) => cita.fecha_asignada))
      );
      setDates(uniqueDates);

      setCitas(allCitas);
      setIsLoading(false);
    }
    setIsLoading(true);

    if (sessionDataStorage) {
      fetchData();
    }
  }, [sessionDataStorage]);

  useEffect(() => {
    const total = citas.reduce((acc, cita) => acc + cita.costo, 0);
    setTotalGanancias(total);
  }, [citas]);

  const calcularCostoPorServicio = () => {
    const citasFiltradas = citas.filter(
      (cita) =>
        (selectedDateRange === "TODOS" ||
          cita.fecha_asignada === selectedDateRange) &&
        (selectedStatus === "TODOS" || cita.estatus === selectedStatus)
    );

    const serviciosData = {};
    services.forEach((service) => {
      serviciosData[service.nombre] = 0;
    });

    citasFiltradas.forEach((cita) => {
      serviciosData[cita.nombre_servicio_asignado] += cita.costo;
    });

    return serviciosData;
  };

  const calcularCitasPorEstatus = () => {
    const completadas = citas.filter(
      (cita) => cita.estatus === "COMPLETADA"
    ).length;
    const canceladas = citas.filter(
      (cita) => cita.estatus === "CANCELADA"
    ).length;
    const pendientes = citas.filter(
      (cita) => cita.estatus === "PENDIENTE"
    ).length;
    return [
      { name: "Completadas", value: completadas },
      { name: "Canceladas", value: canceladas },
      { name: "Pendientes", value: pendientes },
    ];
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const customColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f0e",
    "#ff0066",
    "#3399ff",
  ];

  return (
    <Box>
      <Paper
        sx={{
          mb: 1,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel>Fecha</InputLabel>
          <Select
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            label="Fecha"
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
          <InputLabel>Estatus</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Estatus"
          >
            <MenuItem value="TODOS">Todos</MenuItem>
            <MenuItem value="COMPLETADA">Completada</MenuItem>
            <MenuItem value="CANCELADA">Cancelada</MenuItem>
            <MenuItem value="PENDIENTE">Pendiente</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row">
          <Typography variant={"h6"}>
            <strong>Total: </strong>
          </Typography>
          <Chip
            icon={<MonetizationOnIcon sx={{ width: 28, height: 28 }} />}
            label={` ${totalGanancias}`}
            variant="outlined"
            sx={{ ml: 1 }}
            style={{ fontSize: "18px" }}
          />
        </Stack>
      </Paper>

      <Paper sx={{ mb: 1 }}>
        <Stack direction="row">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={[calcularCostoPorServicio()]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {services.map((service, index) => (
                <Bar
                  key={service.nombre}
                  dataKey={service.nombre}
                  fill={customColors[index % customColors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>

          {selectedDateRange == "TODOS" && (
            <MuiTooltip
              title={
                <Stack>
                  {calcularCitasPorEstatus().map((entry, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mr: 1 }}
                    >
                      <Chip
                        label={`${entry.name}: ${entry.value}`}
                        style={{
                          backgroundColor: customColors[index],
                          color: "#fff",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Estado de Citas</strong>
                </Typography>

                <PieChart width={200} height={200}>
                  <Pie
                    data={calcularCitasPorEstatus()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {calcularCitasPorEstatus().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={customColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </MuiTooltip>
          )}
        </Stack>
      </Paper>

      <TablaReportes data={citas} isLoading={isLoadingApp} />
    </Box>
  );
};

export default ReportesAdministrador;

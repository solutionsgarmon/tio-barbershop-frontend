import React, { useState, useEffect } from "react";
import TablaReportes from "./TablaReportes";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
import {
  getBarbers,
  getBarbershops,
  getCitas,
  getCitasRegistro,
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
  Avatar,
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
  const [selectedBarbero, setSelectedBarbero] = useState("TODOS");
  const [selectedBarberoId, setSelectedBarberoId] = useState("TODOS"); // Estado para almacenar el _id del barbero seleccionado
  const [barbers, setBarbers] = useState([]); // Estado para almacenar los barberos
  const [imageSelectedBarber, setImageSelectedBarber] = useState("");
  const [serviciosDataActual, setServiciosDataActual] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setServices(await getServices());
      setBarbers(await getBarbers()); // Obtener lista de barberos

      const Citas = await getCitas();
      const CitasRegistro = await getCitasRegistro();
      const allCitas = [...Citas, ...CitasRegistro];

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

  const calcularTotalGanancias = () => {
    const serviciosData = calcularCostoPorServicio();
    let total = 0;
    for (const servicio in serviciosData) {
      total += serviciosData[servicio];
    }
    return total;
  };

  useEffect(() => {
    setTotalGanancias(calcularTotalGanancias());
  }, [citas, selectedDateRange, selectedStatus, selectedBarberoId]);

  const calcularCostoPorServicio = () => {
    const citasFiltradas = citas.filter(
      (cita) =>
        (selectedDateRange === "TODOS" ||
          cita.fecha_asignada === selectedDateRange) &&
        (selectedStatus === "TODOS" || cita.estatus === selectedStatus) &&
        (selectedBarberoId === "TODOS" ||
          cita.barbero_asignado === selectedBarberoId) // Filtrar por el _id del barbero
    );

    const serviciosData = {};
    services.forEach((service) => {
      serviciosData[service.nombre] = 0;
    });

    citasFiltradas.forEach((cita) => {
      serviciosData[cita.nombre_servicio_asignado] += cita.costo;
    });

    console.log("serviciosData", serviciosData);
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

  // Modificar función para actualizar selectedBarberoId
  const handleBarberoChange = (event) => {
    setSelectedBarbero(event.target.value); // Almacenar el nombre del barbero seleccionado
    const barberId =
      event.target.value === "TODOS"
        ? "TODOS"
        : barbers.find((barber) => barber.nombre === event.target.value)._id;
    if (event.target.value != "TODOS") {
      const img = barbers.find((barber) => barberId == barber._id).imagenes[0];
      setImageSelectedBarber(img.url);
    } else {
      setImageSelectedBarber("");
    }

    setSelectedBarberoId(barberId);
  };

  return (
    <Box>
      <Paper
        sx={{
          mb: 1,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
          maxWidth: "100%",
          "&::-webkit-scrollbar": { height: "5px" },
        }}
      >
        <Stack direction="row">
          {/* Select para filtrar por barberos */}
          <FormControl sx={{ mx: 0.5, minWidth: { xs: 150, sm: 250 } }}>
            <InputLabel>Barbero</InputLabel>
            <Select
              value={selectedBarbero}
              onChange={handleBarberoChange}
              label="Barbero"
            >
              <MenuItem value="TODOS">Todos</MenuItem>
              {barbers.map((barber) => (
                <MenuItem key={barber._id} value={barber.nombre}>
                  {barber.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select para filtrar por Fechas */}
          <FormControl sx={{ mx: 0.5, minWidth: { xs: 130, sm: 150 } }}>
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

          {/* Select para filtrar por Estatus */}
          <FormControl sx={{ mx: 0.5, minWidth: { xs: 100, sm: 150 } }}>
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
        </Stack>

        {selectedBarbero == "TODOS" && (
          <MuiTooltip title="Balance Total">
            <Chip
              icon={<MonetizationOnIcon sx={{ width: 26, height: 26 }} />}
              label={totalGanancias}
              variant="outlined"
              sx={{ ml: 1 }}
              style={{ fontSize: "18px" }}
            />
          </MuiTooltip>
        )}
      </Paper>

      <Paper sx={{ mb: 1, py: 2 }}>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* GRAFICA PASTEL / AVATAR*/}
          {selectedDateRange == "TODOS" &&
            selectedBarbero == "TODOS" &&
            selectedStatus == "TODOS" && (
              <Box>
                <Box
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
                      mr: -3,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      <strong>Estado de Citas</strong>
                    </Typography>

                    <PieChart width={230} height={230}>
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
                          <Cell
                            key={`cell-${index}`}
                            fill={customColors[index]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </Box>
                </Box>
              </Box>
            )}

          {selectedBarbero !== "TODOS" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {console.log("imageSelectedBarber", imageSelectedBarber)}
              <Avatar
                src={imageSelectedBarber}
                sx={{
                  width: { xs: 120, sm: 150 },
                  height: { xs: 120, sm: 250 },
                  mt: 0,
                  ml: 3,
                  mr: -2,
                }}
              />
              <MuiTooltip title="Balance Total">
                <Chip
                  icon={<MonetizationOnIcon sx={{ width: 26, height: 26 }} />}
                  label={totalGanancias}
                  variant="outlined"
                  sx={{ mt: 1, ml: 5 }}
                  style={{ fontSize: "18px" }}
                />
              </MuiTooltip>
            </Box>
          )}
          {/* GRAFICA BARRAS*/}
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
        </Stack>
      </Paper>

      <TablaReportes data={citas} isLoading={isLoadingApp} />
    </Box>
  );
};

export default ReportesAdministrador;

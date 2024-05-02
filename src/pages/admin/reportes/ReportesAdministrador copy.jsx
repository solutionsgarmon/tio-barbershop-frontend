import React, { useState, useEffect } from "react";
import TablaReportesAdministrador from "./TablaReportesAdministrador";
import { getCitas } from "../../../api/gets";
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
import { Box, Paper } from "@mui/material";

const ReportesAdministrador = () => {
  const { isLoadingApp, setIsLoadingApp } = useAppContext();
  const [citas, setCitas] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setCitas(await getCitas());
    }
    fetchData();
  }, [reload]);

  // Calcular el costo promedio de los servicios a lo largo del tiempo
  const calcularCostoPromedioPorFecha = () => {
    const citasPorFecha = citas.reduce((acc, cita) => {
      const fecha = cita.fecha_asignada;
      const costo = cita.costo;
      if (!acc[fecha]) {
        acc[fecha] = { total: 0, count: 0 };
      }
      acc[fecha].total += costo;
      acc[fecha].count++;
      return acc;
    }, {});

    const costoPromedioPorFecha = Object.entries(citasPorFecha).map(
      ([fecha, data]) => ({
        fecha,
        costoPromedio: data.total / data.count,
      })
    );

    return costoPromedioPorFecha;
  };

  return (
    <Box>
      <Paper sx={{ mb: 1 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={calcularCostoPromedioPorFecha()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="costoPromedio" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <TablaReportesAdministrador data={citas} isLoading={isLoadingApp} />
    </Box>
  );
};

export default ReportesAdministrador;

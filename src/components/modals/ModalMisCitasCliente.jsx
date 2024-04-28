import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import { postUser } from "../../api/posts";
import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderOffIcon from "@mui/icons-material/FolderOff";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import { sumarMinutosAHora } from "../../helpers/fechaYhora";
import {
  getCitas,
  getCitasByCorreo,
  getCitasCanceladasByIdBarbero,
  getCitasCompletadasByIdBarbero,
  getCitasPendientesByIdBarbero,
} from "../../api/gets";
import { updateCita } from "../../api/updates";

const ModalMisCitasCliente = ({ handleClose, open, handleOk }) => {
  const { setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [filtroCitas, setFiltroCitas] = useState("PENDIENTE");
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    console.log("filtroCitas", filtroCitas);
    if (sessionDataStorage && open) {
      async function fetchData() {
        if (sessionDataStorage.rol == "CLIENTE") {
          const allCitas = await getCitasByCorreo(sessionDataStorage.correo);

          setCitas(allCitas.filter((cita) => cita.estatus == filtroCitas));
        } else if (sessionDataStorage.rol == "BARBERO") {
          if (filtroCitas == "PENDIENTE")
            setCitas(
              await getCitasPendientesByIdBarbero(sessionDataStorage._id)
            );
          else if (filtroCitas == "COMPLETADA")
            setCitas(
              await getCitasCompletadasByIdBarbero(sessionDataStorage._id)
            );
          else if (filtroCitas == "CANCELADA")
            setCitas(
              await getCitasCanceladasByIdBarbero(sessionDataStorage._id)
            );
        }
      }
      fetchData();
    }
  }, [open, filtroCitas]);

  const reload = async () => {
    if (sessionDataStorage && open) {
      if (sessionDataStorage.rol == "CLIENTE") {
        const allCitas = await getCitasByCorreo(sessionDataStorage.correo);
        setCitas(allCitas.filter((cita) => cita.estatus == filtroCitas));
      } else if (sessionDataStorage.rol == "BARBERO") {
        if (filtroCitas == "PENDIENTE")
          setCitas(await getCitasPendientesByIdBarbero(sessionDataStorage._id));
        else if (filtroCitas == "COMPLETADA")
          setCitas(
            await getCitasCompletadasByIdBarbero(sessionDataStorage._id)
          );
        else if (filtroCitas == "CANCELADA")
          setCitas(await getCitasCanceladasByIdBarbero(sessionDataStorage._id));
      }
    }
  };

  const handleCancelarCita = async (cita) => {
    const id = cita._id;
    const values = { estatus: "CANCELADA" };
    await handleUpdate(values, id);
  };

  // UPDATE ACTION //
  const handleUpdate = async (values, id) => {
    try {
      const resp = await updateCita(values, id);
      console.log("resprespresp =>>>>", resp);
      if (resp.data.success) {
        toast.success("Cita Cancelada");
        await reload();
      } else {
        toast.error("No se pudo Cancelar.");
      }
    } catch (error) {
      console.error("Error al Cancelar Cita:", error);
      toast.error("Error al Cancelar Cita.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#1976d2", // Color de Fondo
          color: "white", // Color del Texto
        }}
      >
        <Stack direction={"row"}>
          <Avatar
            alt="Imagen de perfil"
            src={sessionDataStorage.imagenes[0]?.url}
            sx={{ height: 50, width: 50, mr: 3 }}
          />
          <Typography style={{ fontSize: "35px" }}>
            <strong>Mis citas</strong>
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Select
          value={filtroCitas}
          onChange={(e) => setFiltroCitas(e.target.value)}
          fullWidth
          defaultValue={"PENDIENTE"}
          sx={{ m: "auto", mb: 2, textAlign: "center", height: 50 }}
        >
          <MenuItem value="COMPLETADA">COMPLETAS</MenuItem>
          <MenuItem value="CANCELADA">CANCELADAS</MenuItem>
          <MenuItem value="PENDIENTE">PENDIENTES</MenuItem>
        </Select>
        {citas.length == 0 && (
          <Box sx={{ m: "auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ m: 2 }}>
              No tienes citas con el estatus {filtroCitas}
            </Typography>
            <FolderOffIcon sx={{ width: 100, height: 100 }} />
          </Box>
        )}
        {citas.map((cita) => (
          <Card
            sx={{
              maxWidth: 200,
              margin: "auto",
              marginTop: 0,
              paddingX: 2,
            }}
          >
            <CardContent>
              <Avatar
                src={cita?.imagen_barbero_asignado}
                alt="Imagen del Cliente"
                sx={{
                  width: 80,
                  height: 100,
                  m: "auto",
                  borderRadius: "10%",
                  mb: 1,
                }}
              />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {cita.nombre_barbero_asignado}
              </Typography>
              <br />
              <Stack direction="row">
                <BusinessIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.nombre_barberia_asignada}
                </Typography>
              </Stack>
              <Stack direction="row">
                <ContentCutIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.nombre_servicio_asignado}
                </Typography>
              </Stack>
              {/* <Stack direction="row">
                <MonetizationOnIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.costo} pesos
                </Typography>
              </Stack> */}
              <Stack direction={"row"}>
                <EventIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.fecha_asignada}
                </Typography>
              </Stack>
              <Stack direction="row">
                <AccessTimeIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.hora_inicio_asignada}
                </Typography>
              </Stack>
              {cita.estatus !== "PENDIENTE" && (
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    backgroundColor:
                      cita.estatus == "CANCELADA" ? "red" : "inherit",
                    borderRadius: 5,
                    mt: 1,
                  }}
                >
                  <strong> {cita.estatus}</strong>
                </Typography>
              )}
              {/* <Stack direction="row">
              <AccessTimeIcon />
              <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                {sumarMinutosAHora(dataCita.hora, dataCita.duracion)} - Salida
                Aprox.
              </Typography>
            </Stack> */}{" "}
              {cita.estatus == "PENDIENTE" && (
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ mt: 1 }}
                  onClick={() => handleCancelarCita(cita)}
                >
                  Cancelar Cita
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMisCitasCliente;

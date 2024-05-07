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
  Avatar,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import { postCitaregistro } from "../../api/posts";
import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { sumarMinutosAHora } from "../../helpers/fechaYhora";
import CloseIcon from "@mui/icons-material/Close";
import {
  getCitas,
  getCitasByCorreo,
  getCitasRegistroByCorreo,
  getCitasCanceladasByIdBarbero,
  getCitasCompletadasByIdBarbero,
  getCitasPendientesByIdBarbero,
} from "../../api/gets";
import { deleteCita } from "../../api/deletes";

const ModalMisCitasBarbero = ({ handleClose, open, handleOk }) => {
  const { setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [filtroCitas, setFiltroCitas] = useState("PENDIENTE");
  const [citas, setCitas] = useState([]);

  //Al abrir, se mostrarán las citas pendientes (cuando es pendientes no se filtra, la coleccion tiene puras pendientes)
  useEffect(() => {
    console.log("filtroCitas", filtroCitas);
    if (sessionDataStorage && open) {
      async function fetchData() {
        if (sessionDataStorage.rol == "CLIENTE") {
          setCitas(await getCitasByCorreo(sessionDataStorage.correo));
        } else if (sessionDataStorage.rol == "BARBERO") {
          setCitas(await getCitasPendientesByIdBarbero(sessionDataStorage._id));
        }
      }

      fetchData();
    }
  }, [open]);

  //Al cambiar el filtro, dependiendo del filtro trae los datos de la BD y cambia las citas que se muestran
  useEffect(() => {
    console.log("Cambio el FILTRO:", filtroCitas);
    if (sessionDataStorage && open) {
      async function fetchData() {
        if (sessionDataStorage.rol === "CLIENTE") {
          console.log("ES CLIENTE...");
          if (filtroCitas === "PENDIENTE") {
            setCitas(await getCitasByCorreo(sessionDataStorage.correo));
          }
          if (filtroCitas === "COMPLETADA") {
            const citasRegistro = await getCitasRegistroByCorreo(
              sessionDataStorage.correo
            );
            setCitas(
              citasRegistro.filter((cita) => cita.estatus === "COMPLETADA")
            );
          }
          if (filtroCitas === "CANCELADA") {
            const citasRegistro = await getCitasRegistroByCorreo(
              sessionDataStorage.correo
            );
            setCitas(
              citasRegistro.filter((cita) => cita.estatus === "CANCELADA")
            );
          }
        } else if (sessionDataStorage.rol === "BARBERO") {
          console.log("ES BARBERO...");
          if (filtroCitas === "PENDIENTE") {
            setCitas(
              await getCitasPendientesByIdBarbero(sessionDataStorage._id)
            );
          } else if (filtroCitas === "COMPLETADA") {
            const registroCitas = await getCitasCompletadasByIdBarbero(
              sessionDataStorage._id
            );
            setCitas(
              registroCitas.filter((cita) => cita.estatus === "COMPLETADA")
            );
          } else if (filtroCitas === "CANCELADA") {
            const citasRegistro = await getCitasCanceladasByIdBarbero(
              sessionDataStorage._id
            );
            setCitas(citasRegistro);
          }
        }
      }

      fetchData();
    }
  }, [filtroCitas]);

  const reload = async () => {
    if (sessionDataStorage && open) {
      if (sessionDataStorage.rol == "CLIENTE") {
        setCitas(await getCitasByCorreo(sessionDataStorage.correo));
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

  //Cambiar de pendiente a cancelado/terminado
  const handleCancelarCita = async (cita) => {
    const nuevaCita = JSON.parse(JSON.stringify(cita));
    nuevaCita.estatus = "CANCELADA";
    await handleUpdateStatus(nuevaCita);
  };

  //Cambiar de pendiente a cancelado/terminado
  const handleCompletarCita = async (cita) => {
    const nuevaCita = JSON.parse(JSON.stringify(cita));
    nuevaCita.estatus = "COMPLETADA";
    await handleUpdateStatus(nuevaCita);
  };

  // UPDATE ACTION //
  // 1. Eliminar la cita, 2. Crear esa misma cita pero con estatus cambiado en citas_registro
  const handleUpdateStatus = async (cita) => {
    try {
      await deleteCita(cita._id);
      await postCitaregistro(cita);

      toast.success("Estatus de citamodificado.");
      await reload();
    } catch (error) {
      console.error("Error al modificar:", error);
      toast.error("Error al modificar el estatus.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#E2b753 ", // Color de Fondo
          color: "black", // Color del Texto
        }}
      >
        <Stack direction={"row"} sx={{ my: -1 }}>
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
      <DialogContent dividers sx={{ backgroundColor: "#EEE" }}>
        <Stack
          direction={"row"}
          // sx={{ ml: { xs: -2.5 }, mt: { xs: -1.8, sm: -1.5 } }}
          sx={{ m: "auto", mb: 1 }}
        >
          <Paper sx={{ mb: 1 }}>
            <Select
              value={filtroCitas}
              onChange={(e) => setFiltroCitas(e.target.value)}
              fullWidth
              defaultValue={"PENDIENTE"}
              sx={{ textAlign: "center", width: { xs: 110, sm: 170 } }}
            >
              <MenuItem value="COMPLETADA">COMPLETADAS</MenuItem>
              <MenuItem value="CANCELADA">CANCELADAS</MenuItem>
              <MenuItem value="PENDIENTE">PENDIENTES</MenuItem>
            </Select>
          </Paper>
          <Paper sx={{ mb: 1, ml: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                defaultValue={dayjs("2024-05-03")}
                sx={{ width: 140 }}
              />
            </LocalizationProvider>
          </Paper>{" "}
        </Stack>
        {citas.length == 0 && (
          <Box sx={{ m: "auto", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
              No tienes un registro de citas
            </Typography>
            <FolderOffIcon sx={{ width: 100, height: 100 }} />
          </Box>
        )}
        {citas.map((cita) => (
          <Card
            sx={{
              maxWidth: 250,
              margin: "auto",
              marginBottom: 1,
              paddingX: 2,
            }}
          >
            <CardContent>
              <Avatar
                src={"/images/icons/cliente.png"}
                alt="Imagen del Cliente"
                sx={{
                  width: 80,
                  height: 80,
                  m: "auto",
                  borderRadius: "10%",
                  mb: 1,
                }}
              />
              <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
                {cita.datos_cliente.nombre}
              </Typography>

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
              <Stack direction="row">
                <MonetizationOnIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.costo} pesos
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <EventIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.fecha_asignada}
                </Typography>
              </Stack>
              <Stack direction="row">
                <AccessTimeIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  {cita.hora_inicio_asignada} a {cita.hora_fin_asignada}
                </Typography>
              </Stack>
            </CardContent>
            <Stack direction="row" sx={{ textAlign: "center" }}>
              {cita.estatus === "CANCELADA" && (
                <CancelIcon
                  color="error"
                  sx={{ width: 35, height: 35, mr: -2 }}
                />
              )}
              {cita.estatus === "COMPLETADA" && (
                <CheckCircleOutlineIcon
                  color="success"
                  sx={{ width: 35, height: 35, mr: 0 }}
                />
              )}

              {cita.estatus === "PENDIENTE" && (
                <WatchLaterIcon sx={{ width: 30, height: 30, ml: 2, mr: -5 }} />
              )}

              <Typography variant="h6" sx={{ m: "auto", mb: 2 }}>
                {cita.estatus}
              </Typography>
            </Stack>
            {cita.estatus == "PENDIENTE" && (
              <Stack direction="row" sx={{ mb: 2 }}>
                <Button
                  onClick={() => handleCancelarCita(cita)}
                  variant={"contained"}
                  color="error"
                  sx={{ mx: 0.5, width: "40%", py: 1 }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleCompletarCita(cita)}
                  variant={"contained"}
                  sx={{ mx: 0.5, py: 1 }}
                >
                  Completar
                </Button>
              </Stack>
            )}
          </Card>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          <Typography>
            Cerrar
            {/* <CloseIcon sx={{ mb: -0.8 }} /> */}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMisCitasBarbero;

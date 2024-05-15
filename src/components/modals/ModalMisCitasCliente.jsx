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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import { deleteCita } from "../../api/deletes";
import { postCitaregistro } from "../../api/posts";
import { getCitasByCorreo, getCitasRegistroByCorreo } from "../../api/gets";
import { updateCita } from "../../api/updates";

const ModalMisCitasCliente = ({ handleClose, open, handleOk }) => {
  const { setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [filtroCitas, setFiltroCitas] = useState("PENDIENTE");
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    console.log("filtroCitas", filtroCitas);
    if (sessionDataStorage && open) {
      async function fetchData() {
        if (sessionDataStorage.rol === "CLIENTE") {
          console.log("ES CLIENTE...");
          if (filtroCitas === "PENDIENTE") {
            console.log(
              "await getCitasByCorreo(sessionDataStorage.correo)",
              await getCitasByCorreo(sessionDataStorage.correo)
            );
            setCitas(await getCitasByCorreo(sessionDataStorage.correo));
          }
          if (filtroCitas === "COMPLETADA" || filtroCitas === "CANCELADA") {
            const citasRegistro = await getCitasRegistroByCorreo(
              sessionDataStorage.correo
            );
            if (citasRegistro !== null) {
              if (citasRegistro) {
                const citaas = citasRegistro.filter(
                  (cita) => cita.estatus === filtroCitas
                );
                console.log(" citaas", citaas);
                setCitas(citaas);
              } else {
                console.log("setCitas([]);");
                setCitas([]);
              }
            } else {
              console.log("setCitas([]);");
              setCitas([]); // No hay citas registradas, establece citas como un array vacío
            }
          }
        }
      }
      fetchData();
    }
  }, [open, filtroCitas]);

  const reload = async () => {
    if (sessionDataStorage && open) {
      if (sessionDataStorage.rol == "CLIENTE") {
        const allCitas = await getCitasByCorreo(sessionDataStorage.correo);

        if (allCitas) {
          const citass = allCitas.filter((cita) => cita.estatus == filtroCitas);
          console.log("citass", citass);
          setCitas(citass);
        } else {
          console.log("citas []");
          setCitas([]);
        }
      }
    }
  };

  const handleCancelarCita = async (cita) => {
    const nuevaCita = JSON.parse(JSON.stringify(cita));
    nuevaCita.estatus = "CANCELADA";
    await handleUpdateStatus(nuevaCita);
  };

  // UPDATE ACTION //
  // 1. Eliminar la cita, 2. Crear esa misma cita pero con estatus cambiado en citas_registro
  const handleUpdateStatus = async (cita) => {
    try {
      await deleteCita(cita._id);
      await postCitaregistro(cita);

      toast.success("Estatus de cita modificado.");
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
        <Stack direction={"row"}>
          <Avatar
            alt="Imagen de perfil"
            src={sessionDataStorage.imagenes[0]?.url}
            sx={{ height: 50, width: 50, mr: 3 }}
          />
          <Typography style={{ fontSize: "30px" }}>
            <strong>Mis citas</strong>
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 300 }}>
        <Select
          value={filtroCitas}
          onChange={(e) => setFiltroCitas(e.target.value)}
          fullWidth
          defaultValue={"PENDIENTE"}
          sx={{ m: "auto", mb: 2, textAlign: "center", height: 50 }}
        >
          <MenuItem value="COMPLETADA">COMPLETADAS</MenuItem>
          <MenuItem value="CANCELADA">CANCELADAS</MenuItem>
          <MenuItem value="PENDIENTE">PENDIENTES</MenuItem>
        </Select>
        {citas.length == 0 && (
          <Box sx={{ m: "auto", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
              No tienes ninguna cita {filtroCitas}
            </Typography>
            <FolderOffIcon sx={{ width: 100, height: 100 }} />
          </Box>
        )}
        {citas.map((cita) => (
          <Card
            sx={{
              maxWidth: 250,
              margin: "auto",
              marginTop: 0,
              marginBottom: 1,
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

              <Stack direction="row" sx={{ textAlign: "center", mt: 1 }}>
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
                  <WatchLaterIcon
                    color="main"
                    sx={{ width: 35, height: 35, mr: -2 }}
                  />
                )}
                <Typography variant="h6" sx={{ m: "auto", mb: 2 }}>
                  {cita.estatus}
                </Typography>
              </Stack>
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
        <Button
          onClick={handleClose}
          variant="outlined"
          fullWidth
          color="error"
        >
          <Typography>
            Cerrar
            {/* <CloseIcon sx={{ mb: -0.8 }} /> */}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMisCitasCliente;

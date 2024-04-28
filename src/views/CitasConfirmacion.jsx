import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useAppContext } from "../context/AppProvider";
import { postCita } from "../api/posts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sumarMinutosAHora } from "../helpers/fechaYhora";

const CitasConfirmacion = ({ setDataCita, dataCita }) => {
  const navigate = useNavigate();
  const { setIsLoadingApp } = useAppContext();
  const [nombre, setNombre] = useState(dataCita?.nombre_cliente);
  const [telefono, setTelefono] = useState(dataCita?.telefono_cliente);
  const [correo, setCorreo] = useState(dataCita?.correo_cliente);
  const [nota, setNota] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombre == "" || telefono == "") {
      console.log("Debe llenar los campos obligatorios");
      toast.warning("Complete los campos obligatorios.");
      return;
    }

    const values = {
      nombre_servicio_asignado: dataCita.servicio,
      servicio_asignado: dataCita.id_servicio,
      nombre_barbero_asignado: dataCita.barbero,
      barbero_asignado: dataCita.id_barbero,
      nombre_barberia_asignada: dataCita.barberia,
      barberia_asignada: dataCita.id_barberia,
      hora_inicio_asignada: dataCita.hora,
      imagen_barbero_asignado: dataCita.imagen_barbero,
      hora_fin_asignada: sumarMinutosAHora(dataCita.hora, dataCita.duracion),
      fecha_asignada: dataCita.fecha,
      estatus: "PENDIENTE",
      costo: dataCita.costo,
      notas: nota,
      fecha_creacion: new Date(),
      fecha_actualizacion: [],
      recordatorio: {
        tipo: "WHATSAPP",
        enviado: "NO",
      },
      datos_cliente: {
        nombre: nombre,
        telefono: telefono,
        correo: correo,
      },
    };
    handleCreate(values);
  };

  // CREATE ACTION //
  const handleCreate = async (values) => {
    console.log("values", values);
    setIsLoadingApp(true); //loading button

    try {
      const resp = await postCita(values);
      console.log("resp", resp.data.success);
      if (resp.data.success) {
        toast.success("Cita Registrada Exitosamente");
        navigate("/");
      } else {
        console.error("Error al crear Cita:", resp.data.message);
        toast.error("Error al crear Cita.");
      }
    } catch (error) {
      console.error("Error al crear Cita:", error.message);
      toast.error("Error al crear Cita.");
    }

    setIsLoadingApp(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: "auto",
        marginTop: 0,
        paddingX: 2,
      }}
    >
      <CardContent>
        <img
          src={dataCita?.imagen_barbero}
          alt="Imagen del barbero"
          style={{ maxWidth: "100%", borderRadius: "50%", marginBottom: 5 }}
        />
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {dataCita.barbero}
        </Typography>
        <br /> <br />
        <Stack direction="row">
          <BusinessIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {dataCita.barberia}
          </Typography>
        </Stack>
        <Stack direction="row">
          <ContentCutIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {dataCita.servicio}
          </Typography>
        </Stack>
        <Stack direction="row">
          <MonetizationOnIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {dataCita.costo} pesos
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <EventIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {dataCita.fecha}
          </Typography>
        </Stack>
        <Stack direction="row">
          <AccessTimeIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {dataCita.hora} - Hora cita
          </Typography>
        </Stack>
        <Stack direction="row">
          <AccessTimeIcon />
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
            {sumarMinutosAHora(dataCita.hora, dataCita.duracion)} - Salida
            Aprox.
          </Typography>
        </Stack>
        <br /> <br />
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <TextField
                label="Nombre*"
                variant="outlined"
                fullWidth
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono*"
                variant="outlined"
                fullWidth
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Agrega una nota..."
                multiline
                rows={4}
                value={nota}
                onChange={(event) => setNota(event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={nombre == ""}
                sx={{ mt: 5 }}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CitasConfirmacion;

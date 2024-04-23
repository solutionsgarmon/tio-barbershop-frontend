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
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = (event) => {
    if (nombre == "" || telefono == "") {
      toast.warning("Debe llenar los campos obligatorios");
      return;
    }
    event.preventDefault();

    const values = {
      servicio_asignado: dataCita.id_servicio,
      barbero_asignado: dataCita.id_barbero,
      barberia_asignada: dataCita.id_barberia,
      hora_inicio_asignada: dataCita.hora,
      hora_fin_asignada: sumarMinutosAHora(dataCita.hora, dataCita.duracion),
      fecha_asignada: dataCita.fecha,
      estatus: "PENDIENTE",
      notas: "",
      fecha_creacion: new Date(),
      fecha_actualizacion: [],
      recordatorio: {
        tipo: "CORREO",
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
            {dataCita.hora} -{" "}
            {sumarMinutosAHora(dataCita.hora, servicio.duracion)}
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

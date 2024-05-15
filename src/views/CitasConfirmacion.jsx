import React, { useEffect } from "react";
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
import SendIcon from "@mui/icons-material/Send";

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

const CitasConfirmacion = ({
  setDataCita,
  dataCita,
  confirmacion,
  setConfirmacion,
}) => {
  const navigate = useNavigate();
  const { setIsLoadingApp } = useAppContext();
  const [nombre, setNombre] = useState(dataCita?.nombre_cliente);
  const [telefono, setTelefono] = useState(dataCita?.telefono_cliente);
  const [correo, setCorreo] = useState(dataCita?.correo_cliente);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [nota, setNota] = useState("");
  const correoValido = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (confirmacion) {
      handleSubmit();
    }
  }, [confirmacion]);

  const handleSubmit = () => {
    setConfirmacion(false);
    //Validacion no vacios
    if (nombre == "" || telefono == "") {
      console.log("Debe llenar los campos obligatorios");
      toast.warning("Complete los campos obligatorios.");
      return;
    }

    if (telefono.length !== 10) {
      console.log("Debe llenar los campos obligatorios");
      toast.warning("Ingrese su numero telefónico a 10 dígitos");
      return;
    }
    if (!nombre.trim() || !telefono.trim()) {
      setErrorNombre(!nombre.trim());
      setErrorTelefono(!telefono.trim());
      return;
    }
    //Validación nombre
    if (/\d/.test(nombre)) {
      setErrorNombre(true);
      toast.error("El nombre no puede contener números.");
      return;
    }

    // Validación de que el teléfono solo contenga números
    if (!/^\d+$/.test(telefono)) {
      setErrorTelefono(true);
      toast.error("El teléfono solo puede contener números.");
      return;
    }

    // Validación de correo electrónico
    if (correo !== "") {
      if (!correoValido.test(correo)) {
        setErrorCorreo(true);
        toast.error("Ingrese un correo electrónico válido.");
        return;
      }
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

  //Formatear fecha de  AAAA-MM-DD a DD-MM-AAAA
  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = (fecha.getDate() + 1).toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 aquí
    const año = fecha.getFullYear();

    return `${dia}-${mes}-${año}`;
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
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
        <Typography
          variant="text.secondary"
          sx={{ textAlign: "center", fontFamily: "Century Gothic" }}
        >
          Barbero
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontFamily: "Century Gothic" }}
        >
          {dataCita.barbero}
        </Typography>
        <br /> <br />
        <Stack direction="row">
          <BusinessIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
            {dataCita.barberia}
          </Typography>
        </Stack>
        <Stack direction="row">
          <ContentCutIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
            {dataCita.servicio}
          </Typography>
        </Stack>
        <Stack direction="row">
          <MonetizationOnIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
            {dataCita.costo} pesos
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <EventIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
            {formatearFecha(dataCita.fecha)}
          </Typography>
        </Stack>
        <Stack direction="row">
          <AccessTimeIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
            {dataCita.hora} - Hora cita
          </Typography>
        </Stack>
        <Stack direction="row">
          <AccessTimeIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ ml: 1, fontFamily: "Century Gothic" }}
          >
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
                onChange={(event) => {
                  setNombre(event.target.value);
                  setErrorNombre(false); // Reiniciar error al escribir
                }}
                error={errorNombre}
                helperText={errorNombre ? "Nombre requerido" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono (10 dígitos)*"
                variant="outlined"
                fullWidth
                value={telefono}
                onChange={(event) => {
                  setTelefono(event.target.value);
                  if (event.target.value.length !== 10) {
                    setErrorTelefono(true);
                  } else {
                    setErrorTelefono(false);
                  } // Reiniciar error al escribir
                }}
                error={errorTelefono}
                helperText={
                  errorTelefono &&
                  errorTelefono.length != 10 &&
                  "Ingresa 10 dígitos"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                error={errorCorreo}
                value={correo}
                onChange={(event) => {
                  setCorreo(event.target.value);
                  setErrorCorreo(false);
                }}
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
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CitasConfirmacion;

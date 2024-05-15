import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useAppContext } from "../../context/AppProvider";
import { updatePassworsBarber } from "../../api/updates";
import { toast } from "react-toastify";
import { postUser } from "../../api/posts";

const ModalRegistroUsuario = ({ open, handleClose }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const { setIsLoadingApp } = useAppContext();

  const handleSave = async () => {
    if (contrasena !== confirmarContrasena) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    if (nombreCompleto == "" || contrasena == "" || telefono == "") {
      toast.warning("Complete los datos obligatorios");
      return;
    }

    setIsLoadingApp(true);
    const userData = {
      nombre: nombreCompleto,
      correo: correoElectronico,
      password: contrasena,
      telefono: telefono,
    };

    try {
      const resp = await postUser(userData);
      if (resp.data.success) {
        toast.success("Usuario creado, iniciando sesión");
        handleClose();
        setNombreCompleto("");
        setCorreoElectronico("");
        setContrasena("");
        setConfirmarContrasena("");
      } else {
        toast.error("No se pudo modificar.");
      }
    } catch (error) {
      console.error("Error al Registrarse:", error);
      toast.error("Error al Registrarse, intenta con otro correo.");
    }
    setIsLoadingApp(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#E2b753 ", // Color de Fondo
          color: "white", // Color del Texto
        }}
      >
        <Typography style={{ fontSize: "25px" }}>
          <strong>Regístrate</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Nombre Completo*"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Correo electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Numero telefónico*"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Stack direction={"row"}>
          <TextField
            label="Contraseña*"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            fullWidth
            sx={{ mr: 1 }}
          />

          <TextField
            label="Confirmar Contraseña*"
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRegistroUsuario;

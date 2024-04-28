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
import { toast } from "react-toastify";
import { postUser } from "../../api/posts";

const ModalMisCitasCliente = ({ handleClose, open }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#1976d2", // Color de Fondo
          color: "white", // Color del Texto
        }}
      >
        <Typography style={{ fontSize: "25px" }}>
          <strong>Regístrate</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers></DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMisCitasCliente;

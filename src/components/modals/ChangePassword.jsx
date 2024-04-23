import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useAppContext } from "../../context/AppProvider";
import { updatePassworsBarber } from "../../api/updates";
import { toast } from "react-toastify";

const ChangePassword = ({ open, handleClose, barberSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const { setIsLoadingApp } = useAppContext();

  const handleSave = async () => {
    if (inputValue == "") {
      toast.warning("Ingrese una nueva contraseña");
      return;
    }

    setIsLoadingApp(true);
    console.log("Valor guardado:", inputValue);
    const newPassword = { password: inputValue };
    const id = barberSelected._id;

    try {
      const resp = await updatePassworsBarber(newPassword, id);
      if (resp.data.success) {
        toast.success("Se modificó correctamente.");
        handleClose();
        setInputValue("");
        // await setReloadData((prev) => !prev);
      } else {
        toast.error("No se pudo modificar.");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      toast.error("Error al modificar.");
    }
    setIsLoadingApp(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#1976d2", // Color de Fondo
          color: "white", // Color del Texto
        }}
      >
        <Typography style={{ fontSize: "25px" }}>
          <strong>Cambiar Contraseña [{barberSelected?.nombre}]</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Nueva Contraseña"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
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

export default ChangePassword;

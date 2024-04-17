import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

const CustomModal = ({ horario, handleCerrarModal, openModal }) => {
  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Horario de Atención
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {Object.keys(horario).map((day) => (
              <Grid item xs={12} key={day}>
                <FormControlLabel
                  control={<Checkbox checked={horario[day].trabaja === "S"} />}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
                {horario[day].trabaja === "S" && (
                  <Stack direction={"row"} spacing={0}>
                    <Typography>
                      {horario[day].hora_inicio} &nbsp;a&nbsp;{" "}
                      {horario[day].hora_fin}
                    </Typography>
                  </Stack>
                )}
                {horario[day].trabaja === "N" && (
                  <Stack direction={"row"} spacing={0}>
                    <Typography>Cerrado</Typography>
                  </Stack>
                )}
              </Grid>
            ))}
          </Grid>
          <br />
          <Button onClick={handleCerrarModal}>Cerrar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;

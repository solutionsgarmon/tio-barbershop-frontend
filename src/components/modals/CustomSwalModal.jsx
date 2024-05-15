import React from "react";
import {
  Modal,
  Button,
  Paper,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomModal = ({ horario, handleCerrarModal, openModal }) => {
  const days = Object.keys(horario);

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -49.9%)",
          backgroundColor: "white",
          padding: "0rem",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px", // Limita el ancho máximo del modal
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            padding: "16px 0",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#E2b753 ",
          }}
        >
          <Typography variant="h5" align="center">
            Horario de Atención
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
            onClick={handleCerrarModal}
          >
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ marginTop: "0px" }}>
          {" "}
          {/* Margen superior para dejar espacio para el título */}
          <Grid container spacing={1}>
            {days.map((day) => (
              <Grid item xs={12} key={day}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 1,
                    borderRadius: 2,
                    backgroundColor:
                      horario[day].trabaja === "S" ? "#f0f0f0" : "transparent",
                  }}
                >
                  <Typography variant="body1" align="center">
                    <strong>
                      {day.charAt(0).toUpperCase() + day.slice(1)}:
                    </strong>
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={0}>
                    <Typography>
                      {horario[day].trabaja === "S"
                        ? `${horario[day].hora_inicio} a ${horario[day].hora_fin}`
                        : "Cerrado"}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;

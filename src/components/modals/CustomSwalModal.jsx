import React from "react";
import { Modal, Button, Paper, Typography, Stack, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Avatar } from "antd";

const CustomModal = ({ horario, handleCerrarModal, openModal }) => {
  const days = Object.keys(horario);

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "1rem",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Horario de Atención
        </Typography>

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
                  <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
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
        <Button
          variant="outlined"
          onClick={handleCerrarModal}
          sx={{ mt: 2, mx: "auto", display: "block", px: 5, py: 2 }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;

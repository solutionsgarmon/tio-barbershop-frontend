import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const TEXTO =
    "El tío Barbershop es el establecimiento número 1 en corte de cabello y estilizado de barba en CDMX. ¡Visítanos y compruébalo tú mismo!";

  return (
    <Box sx={{ mt: 0, backgroundColor: "#FFF" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            textAlign: "center",
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ width: 60, height: 60 }} />
          <Typography variant="h4" component="h2" sx={{ my: 2, maxWidth: 300 }}>
            ¡UPS!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, maxWidth: 400 }}>
            Parece que algo no está funcionando correctamente en nuestra página,
            por favor inténtalo de nuevo.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
            Si el problema persiste, no dudes en contactarnos.
          </Typography>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="contained"
            color="primary"
            href="index.html"
            sx={{ mb: 4, py: 1 }}
          >
            <HomeIcon sx={{ mt: -0.3, mr: 1 }} /> Continuar Navegando
          </Button>
        </Box>

        <Box sx={{ mt: -6 }}>
          <footer className="page-footer page-footer-default">
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src="images/icon-tio.png" alt="" width="100" />
                <Typography
                  variant="h7"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    maxWidth: 400,
                    border: 1,
                    p: 1,
                  }}
                >
                  {TEXTO}
                </Typography>
              </Box>
            </Container>
          </footer>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;

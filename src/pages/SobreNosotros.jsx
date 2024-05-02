import React from "react";
import { Box, Typography, Fade, Slide } from "@mui/material";
import BarberImage from "../../public/images/icon-tio2.png"; // Ruta a tu imagen de barberos

const SobreNosotros = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#E2b753 ",
        p: { xs: 2, sm: 5 },
        textAlign: "center",
        mb: -2,
        minHeight: "57.5vh",
      }}
    >
      <Box sx={{ maxWidth: 900, m: "auto" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mt: { xs: 3, sm: 0 } }}
        >
          ¡Conócenos!
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ textAlign: { sx: "justify", sm: "center" } }}
        >
          Somos el Tío Barbershop, el lugar donde la tradición se encuentra con
          la modernidad. Nuestro equipo de barberos expertos está aquí para
          brindarte el mejor servicio de corte de cabello y estilizado de barba
          en la Ciudad de México.
        </Typography>
        <br />
        <Typography variant="body1">
          Ven y descubre por qué somos la barbería #1 en la CDMX. ¡Te esperamos!
        </Typography>

        {/* Imagen de barberos */}
        <Fade in timeout={1000}>
          <img
            src={BarberImage}
            alt="Barberos"
            style={{ width: "140px", marginTop: "2rem" }}
          />
        </Fade>

        {/* Animación de texto */}
        <Slide direction="up" in timeout={1000}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            ¡Corte de cabello y estilizado de barba de primera clase!
          </Typography>
        </Slide>
      </Box>
    </Box>
  );
};

export default SobreNosotros;

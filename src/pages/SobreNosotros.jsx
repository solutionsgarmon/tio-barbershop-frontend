import React from "react";
import { Box, Typography, Fade, Slide } from "@mui/material";
import BarberImage from "../../public/images/icon-tio2.png"; // Ruta a tu imagen de barberos

const SobreNosotros = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#FFD700",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        ¡Conócenos!
      </Typography>
      <Typography variant="body1">
        Somos el Tío Barbershop, el lugar donde la tradición se encuentra con la
        modernidad. Nuestro equipo de barberos expertos está aquí para brindarte
        el mejor servicio de corte de cabello y estilizado de barba en la Ciudad
        de México.
      </Typography>
      <Typography variant="body1">
        En el Tío Barbershop, no solo nos preocupamos por tu apariencia, sino
        también por tu experiencia. Nuestro ambiente relajado y amigable te hará
        sentir como en casa mientras te mimamos con nuestros servicios premium.
      </Typography>
      <Typography variant="body1">
        Ven y descubre por qué somos el #1 en la CDMX. ¡Te esperamos!
      </Typography>

      {/* Imagen de barberos */}
      <Fade in timeout={1000}>
        <img
          src={BarberImage}
          alt="Barberos"
          style={{ width: "300px", marginTop: "2rem", borderRadius: "8px" }}
        />
      </Fade>

      {/* Animación de texto */}
      <Slide direction="up" in timeout={1000}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          ¡Corte de cabello y estilizado de barba de primera clase!
        </Typography>
      </Slide>
    </Box>
  );
};

export default SobreNosotros;

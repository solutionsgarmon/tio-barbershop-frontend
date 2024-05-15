import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import { Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: "#e2b753", // Color de fondo personalizado para los otros botones
  color: "white", // Color del icono de los otros botones
}));

const StyledWhatsAppFab = styled(Fab)({
  backgroundColor: "#25d366", // Color de fondo personalizado para el círculo verde de WhatsApp
  color: "white",
  "&:hover": {
    backgroundColor: "#128C7E", // Color de fondo al pasar el cursor para el botón de WhatsApp
  },
});

export default function FloatingAddButton({ handleClickFloatingButton }) {
  const handleClickCitas = () => {
    handleClickFloatingButton();
  };

  const handleSendWhatsAppMessage = () => {
    const phoneNumber = "523113913306";
    const message =
      "¡Hola tio barbershop! Me comunico por el siguiente motivo: ";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    // Abre una nueva ventana o pestaña para iniciar la conversación de WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <Stack direction={"column"}>
        <StyledFab sx={{ mb: 1 }} aria-label="add" onClick={handleClickCitas}>
          <EventIcon sx={{ width: 30, height: 30 }} />
        </StyledFab>

        <StyledWhatsAppFab
          aria-label="add-whatsapp"
          onClick={handleSendWhatsAppMessage}
        >
          <WhatsAppIcon sx={{ width: 32, height: 32 }} />
        </StyledWhatsAppFab>
      </Stack>
    </Box>
  );
}

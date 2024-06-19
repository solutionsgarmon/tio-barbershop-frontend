import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import { Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useAppContext } from "../../context/AppProvider";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

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

export default function FloatingAddButton({ handleClickFloatingButtonCitas, isFullscreen, enterFullscreen, exitFullscreen }) {
	const { setIsLoadingApp } = useAppContext();
	const handleClickCitas = () => {
		setIsLoadingApp(true);
		handleClickFloatingButtonCitas();
	};

	const handleSendWhatsAppMessage = () => {
		const phoneNumber = "5655359271";
		const message = "¡Hola tio barbershop! Me comunico por el siguiente motivo: ";

		const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
		// Abre una nueva ventana o pestaña para iniciar la conversación de WhatsApp
		window.open(whatsappLink, "_blank");
	};

	return (
		<Box sx={{ position: "fixed", bottom: "15px", right: "15px" }}>
			<Stack direction={"column"}>
				{/* <StyledFab sx={{ mb: 1, width: 50, height: 50 }} aria-label='fullscreen' onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
					{isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
				</StyledFab> */}
				<StyledFab aria-label='add' onClick={handleClickCitas} sx={{ width: 50, height: 50, mb: 1 }}>
					<EventIcon sx={{ width: 25, height: 25 }} />
				</StyledFab>

				<StyledWhatsAppFab aria-label='add-whatsapp' onClick={handleSendWhatsAppMessage} sx={{ width: 50, height: 50 }}>
					<WhatsAppIcon sx={{ width: 25, height: 25 }} />
				</StyledWhatsAppFab>
			</Stack>
		</Box>
	);
}

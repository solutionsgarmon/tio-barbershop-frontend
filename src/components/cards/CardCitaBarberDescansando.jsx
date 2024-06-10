import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { scrollToBottom } from "../../utils/screen";
import { Chip } from "@mui/material";
import LockClockIcon from "@mui/icons-material/LockClock";

const CardCitaBarberDescansando = ({ barbero, onSelect, dataCita, withButtons = true }) => {
	const [hovered, setHovered] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);
	const [isSelected, setIsSelected] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
		setImageIndex(0);
	};

	React.useEffect(() => {
		let interval;
		if (hovered && barbero?.imagenes.length > 1) {
			interval = setInterval(() => {
				setImageIndex((prevIndex) => (prevIndex === barbero.imagenes.length - 1 ? 0 : prevIndex + 1));
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [hovered, barbero]);

	return (
		<Card
			sx={{
				width: { xs: 175, sm: 280 },
				border: isSelected ? "5px solid #E2b753 " : "none",
				backgroundColor: "#CCC",
				cursor: "pointer",
				"&:hover": {
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
					transform: "scale(1.01)",
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={onSelect}
		>
			<CardMedia
				sx={{
					height: { xs: 200, sm: 300 },
					p: isSelected ? 0 : 0.5,
					borderRadius: 2,
				}}
				component='img'
				alt={barbero.nombre}
				image={hovered ? barbero?.imagenes[imageIndex]?.url : barbero?.imagenes[0]?.url}
			/>
			<CardContent sx={{ height: { xs: 110, sm: 125 } }}>
				<Typography
					sx={{
						color: "#E2b753 ",
						mt: -1,
						fontSize: { xs: "1.1rem", sm: "1.4rem" },
						fontFamily: "Century Gothic",
					}}
					gutterBottom
					variant='h6'
					component='div'
				>
					{barbero?.nombre}
					{/* <LockClockIcon sx={{ ml: 1 }} /> */}
				</Typography>

				{isSelected ? (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{
							textAlign: "left",
							height: { xs: 60, sm: 75 },
							overflowY: "auto",
							fontSize: { xs: "0.9", sm: "1.1rem" },
							mx: { xs: -1, sm: 0 },
							fontFamily: "Century Gothic",
						}}
					>
						{barbero?.descripcion}
					</Typography>
				) : (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{
							textAlign: "left",
							mx: { xs: -1, sm: 0 },
							height: { xs: 60, sm: 75 },
							overflowY: "auto",
							fontSize: { xs: "0.9", sm: "1.1rem" },
							fontFamily: "Century Gothic",
						}}
					>
						{"Por el momento este barbero no se encuentra disponible, puede esperar un poco o seleccionar otro barbero de su agrado."}
					</Typography>
				)}
			</CardContent>
			{withButtons && (
				<CardActions sx={{ my: 0 }}>
					{/* <Chip sx={{ mx: "auto", my: 1, backgroundColor: "#E2b753" }} label='No disponible' /> */}
					<Button
						disabled
						size='small'
						fullWidth
						variant='outlined'
						sx={{
							fontFamily: "Century Gothic",
							backgroundColor: isSelected ? "#E2b753 " : "#f0f0f0",
							color: isSelected ? "white" : "black",
							p: 1,
						}} // Cambia el color de fondo y texto si está seleccionado
					>
						{"No Disponible"}
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default CardCitaBarberDescansando;

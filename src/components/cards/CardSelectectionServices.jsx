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

const CardSelectectionServices = ({ servicio, onSelect, dataCita, withButtons = true }) => {
	const [hovered, setHovered] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		if (dataCita?.id_servicio == servicio._id) setIsSelected(true);
		else setIsSelected(false);
	}, [dataCita]);

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
		setImageIndex(0);
	};

	const handleSelect = () => {
		onSelect(servicio);
		scrollToBottom();
	};

	React.useEffect(() => {
		let interval;
		if (hovered && servicio?.imagenes.length > 1) {
			interval = setInterval(() => {
				setImageIndex((prevIndex) => (prevIndex === servicio.imagenes.length - 1 ? 0 : prevIndex + 1));
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [hovered, servicio]);

	return (
		<Card
			sx={{
				border: isSelected ? "5px solid #E2b753 " : "none",
				backgroundColor: isSelected ? "#FFF" : "#f1f1f1",
				"&:hover": {
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
					transform: "scale(1.01)",
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleSelect}
		>
			<CardMedia sx={{ p: isSelected ? 0 : 0.5 }} component='img' alt='Servicio' height='150' image={hovered ? servicio?.imagenes[imageIndex]?.url : servicio?.imagenes[0]?.url} />
			<CardContent>
				<Typography sx={{ color: "#E2b753", fontFamily: "Century Gothic" }} gutterBottom variant='h5' component='div'>
					{servicio?.nombre}
				</Typography>
				<Typography
					variant='body2'
					color='#1f1f1f'
					sx={{
						height: 75,
						textAlign: "justify",
						fontSize: "1.1rem",
						overflowY: "auto",
						fontFamily: "Century Gothic",
					}}
				>
					{servicio?.descripcion}
				</Typography>
			</CardContent>
			{withButtons && (
				<CardActions>
					<Button
						size='small'
						fullWidth
						variant='outlined'
						sx={{
							fontFamily: "Century Gothic",
							backgroundColor: isSelected ? "#E2b753 " : "#f0f0f0",
							color: isSelected ? "white" : "black",
						}} // Cambia el color de fondo y texto si está seleccionado
					>
						{isSelected ? "SELECCIONADO" : "Seleccionar"}
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default CardSelectectionServices;

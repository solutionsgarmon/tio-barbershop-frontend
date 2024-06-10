import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableHorario from "../molecules/TableHorario";
import { scrollToBottom } from "../../utils/screen";

const CardCitaBarbershop = ({ barbershop, onSelect, dataCita, withButtons = true }) => {
	const [hovered, setHovered] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		if (dataCita?.id_barberia == barbershop._id) setIsSelected(true);
		else setIsSelected(false);
	}, [dataCita]);

	const handleMouseEnter = () => {
		setImageIndex(1);
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
		setImageIndex(0);
	};

	const handleSelect = () => {
		onSelect(barbershop);
		setIsSelected(true);
		scrollToBottom();
	};

	React.useEffect(() => {
		let interval;
		if (hovered && barbershop?.imagenes.length > 1) {
			interval = setInterval(() => {
				setImageIndex((prevIndex) => (prevIndex === barbershop.imagenes.length - 1 ? 0 : prevIndex + 1));
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [hovered, barbershop]);

	return (
		<Card
			sx={{
				width: 300,
				border: isSelected ? "5px solid #E2b753 " : "none",
				backgroundColor: isSelected ? "#FFF" : "#f1f1f1",
				cursor: "pointer",
				"&:hover": {
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
					transform: "scale(1.01)",
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleSelect}
		>
			<CardMedia
				sx={{ p: isSelected ? 0 : 0.5 }}
				component='img'
				alt='Barbería'
				height='150'
				image={hovered && barbershop?.imagenes.length > 1 ? barbershop?.imagenes[imageIndex]?.url : barbershop?.imagenes[0]?.url}
			/>
			<CardContent>
				<Typography sx={{ color: "#E2b753 ", fontFamily: "Century Gothic" }} gutterBottom variant='h5' component='div'>
					{barbershop?.nombre}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{
						height: 35,
						textAlign: "justify",
						fontFamily: "Century Gothic",
					}}
				>
					{barbershop?.direccion.calle}
					{barbershop?.direccion.colonia}, {barbershop?.direccion.ciudad}
				</Typography>
				<div style={{ margin: "auto" }}>
					<Accordion onClick={(event) => event.stopPropagation()}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
							<Typography sx={{ fontFamily: "Century Gothic" }}>Ver Horario</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ mt: -4 }}>
							<TableHorario horario={barbershop?.horario} />
						</AccordionDetails>
					</Accordion>
				</div>
			</CardContent>
			{withButtons && (
				<CardActions>
					<Button
						size='small'
						onClick={handleSelect}
						fullWidth
						variant='outlined'
						sx={{
							fontFamily: "Century Gothic",
							backgroundColor: isSelected ? "#E2b753 " : "#f0f0f0",
							color: isSelected ? "white" : "black",
							p: 1,
						}} // Cambia el color de fondo y texto si está seleccionado
					>
						{isSelected ? "SELECCIONADO" : "Seleccionar"}
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default CardCitaBarbershop;

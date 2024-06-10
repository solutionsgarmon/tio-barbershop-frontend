import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Hidden, useMediaQuery, Stack } from "@mui/material";

const CardProduct = ({ producto }) => {
	const isMobile = useMediaQuery("(max-width:600px)");

	const truncateDescription = (description) => {
		return description?.length > 130 ? description?.slice(0, 130) + "..." : description;
	};
	const truncateDescriptionMovil = (description) => {
		return description.length > 60 ? description.slice(0, 60) + "..." : description;
	};

	const truncateTitle = (title) => {
		return title.length > 40 ? title.slice(0, 40) + "..." : title;
	};

	const truncateTitleMovil = (title) => {
		return title.length > 30 ? title.slice(0, 30) + "..." : title;
	};

	return (
		<>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					minWidth: { xs: 120, sm: 250 },
					height: { xs: 330, sm: 450 },
					backgroundColor: "#1f1f1f",
					border: "1px solid #fff",
				}}
			>
				<CardActionArea>
					<CardMedia component='img' sx={{ height: { xs: 170, sm: 250 } }} image={producto?.imagenes[0]?.url} alt={producto?.nombre} />
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography
							gutterBottom
							component='div'
							sx={{
								textAlign: "center",
								height: { xs: 60, sm: 55 },
								m: { xs: -1, sm: 0 },
								color: "#E2b753 ",

								fontSize: { xs: "0.9rem", sm: "1.2rem" },
							}}
						>
							<strong style={{ fontFamily: "Century Gothic" }}>{isMobile ? producto?.nombre : producto?.nombre}</strong>
						</Typography>
						<Typography
							variant='body2'
							color='white'
							sx={{
								textAlign: { xs: "left", sm: "justify" },

								m: { xs: -1, sm: 0 },
								height: { xs: 58, sm: 75 },
								fontSize: { xs: "0.8rem", sm: "1.1rem" },
								overflowY: "auto",
							}}
						>
							{isMobile
								? // ? truncateDescriptionMovil(producto?.descripcion)
								  producto?.descripcion
								: truncateDescription(producto?.descripcion)}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Stack direction={"row"} sx={{ m: "auto", mt: -1 }}>
					<Typography
						variant='h5'
						color='primary'
						sx={{
							textAlign: "center",
							margin: "auto",
						}}
					>
						${producto?.precio}
					</Typography>
					<Typography
						color='primary'
						sx={{
							textAlign: "center",
							margin: "auto",
							mt: -0.1,
							ml: 0.3,

							fontSize: "0.9rem",
						}}
					>
						00
					</Typography>
				</Stack>
			</Card>
		</>
	);
};

export default CardProduct;

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecipeReviewCard({ curso }) {
	const settingsSlider = {
		dots: false,
		infinite: curso?.imagenes?.length > 1, // Solo hacer infinito si hay más de una imagen
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Box>
			{curso && (
				<Card sx={{ mx: "auto", my: 0.7, width: "100%", backgroundColor: "#f1f1f1" }}>
					{curso?.isOnlyImage ? (
						<Stack direction={"row"}>
							<Slider {...settingsSlider}>
								{curso?.imagenes?.map((file, index) => (
									<Stack direction={"row"}>
										<CardMedia component='img' image={file.url} alt='curso' key={index} />
									</Stack>
								))}
							</Slider>
						</Stack>
					) : (
						<>
							<CardHeader
								sx={{ my: -1 }}
								avatar={
									<Avatar
										src={
											curso?.barbero?.imagenes[0]?.url ??
											"https://firebasestorage.googleapis.com/v0/b/storage-eltio-barbershop.appspot.com/o/app-settings%2Flogos%2FLogo-tio.png?alt=media&token=0f3422d1-bfae-49aa-a334-a6da1900e333"
										}
										sx={{ zIndex: 1, border: 2, borderColor: "#fff", bgcolor: red[500], width: 100, height: 100, mb: -8, mr: -15, ml: 5 }}
										aria-label='Cursos'
									/>
								}
								title={curso?.nombre}
								subheader={curso?.fecha_inicio && `Comienza el día ${curso?.fecha_inicio} `}
								titleTypographyProps={{
									sx: {
										fontWeight: "bold",
										fontSize: "1.2rem",
										color: "#1f1f1f",
									},
								}}
								subheaderTypographyProps={{
									sx: {
										fontSize: "0.9rem",
										color: "text.secondary",
									},
								}}
							/>

							{curso?.imagenes?.length > 0 ? (
								<Slider {...settingsSlider}>
									{curso?.imagenes?.map((file, index) => (
										<CardMedia component='img' sx={{ height: "350px" }} image={file.url} alt='Curso' key={index} />
									))}
								</Slider>
							) : (
								<CardMedia
									component='img'
									sx={{ height: "350px" }}
									image='https://firebasestorage.googleapis.com/v0/b/storage-eltio-barbershop.appspot.com/o/app-settings%2Fotros%2Fimagen_2024-06-06_102436867.png?alt=media&token=fbb361e2-c6fe-4379-9d27-64f93d605635'
									alt='Curso'
								/>
							)}

							{curso?.descripcion && (
								<CardContent sx={{ mb: -1 }}>
									<Stack direction={"row"}>
										<Typography variant='body2' color='text.secondary' sx={{ textAlign: "justify" }}>
											{curso?.descripcion}
										</Typography>
									</Stack>
								</CardContent>
							)}
						</>
					)}
				</Card>
			)}
		</Box>
	);
}

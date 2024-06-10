import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red, yellow } from "@mui/material/colors";
import { Box, Stack, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecipeReviewCard({ curso }) {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [selectedImage, setSelectedImage] = React.useState(null);

	const handleOpenModal = (image) => {
		setSelectedImage(image);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedImage(null);
		setModalOpen(false);
	};

	const renderImages = () => {
		const images = curso?.imagenes;
		const numImages = images.length;

		if (numImages === 1) {
			return (
				<CardMedia
					component='img'
					sx={{
						height: "100%",
						width: "100%",
						"&:hover": {
							transform: "scale(1.05)",
							cursor: "pointer",
							transition: "transform 0.5s ease-in-out",
						},
					}}
					image={images[0]?.url}
					alt='Curso'
					onClick={() => handleOpenModal(images[0]?.url)}
				/>
			);
		} else if (numImages === 2) {
			return (
				<Stack direction='row' sx={{ height: "100%", width: "100%", backgroundColor: "#1f1f1f" }}>
					{images.map((image, index) => (
						<CardMedia
							key={index}
							component='img'
							sx={{
								height: "100%",
								width: "50%",
								pr: 1,
								"&:hover": {
									transform: "scale(1.05)",
									cursor: "pointer",
									transition: "transform 0.5s ease-in-out",
								},
							}}
							image={image.url}
							alt='Curso'
							onClick={() => handleOpenModal(image.url)}
						/>
					))}
				</Stack>
			);
		} else if (numImages >= 5) {
			return (
				<Stack direction='row' sx={{ height: "100%", width: "100%", backgroundColor: "#1f1f1f" }}>
					<CardMedia
						component='img'
						sx={{
							height: "100%",
							width: "50%",
							pr: 1,
							"&:hover": {
								transform: "scale(1.05)",
								cursor: "pointer",
								transition: "transform 0.5s ease-in-out",
							},
						}}
						image={images[0]?.url}
						alt='Curso'
						onClick={() => handleOpenModal(images[0]?.url)}
					/>
					<Stack direction='column' sx={{ height: "100%", width: "50%" }}>
						<Stack direction={"row"} sx={{ pb: 1, mt: -0.5 }}>
							{images.slice(1, 3).map((image, index) => (
								<CardMedia
									key={index}
									component='img'
									sx={{
										height: "250px",
										width: "100%",
										pr: 1,
										"&:hover": {
											transform: "scale(1.05)",
											cursor: "pointer",
											transition: "transform 0.5s ease-in-out",
										},
									}}
									image={image.url}
									alt='Curso'
									onClick={() => handleOpenModal(image.url)}
								/>
							))}
						</Stack>
						<Stack direction={"row"}>
							{images.slice(3, 5).map((image, index) => (
								<CardMedia
									key={index}
									component='img'
									sx={{
										height: "250px",
										width: "100%",
										pr: 1,
										"&:hover": {
											transform: "scale(1.05)",
											cursor: "pointer",
											transition: "transform 0.5s ease-in-out",
										},
									}}
									image={image.url}
									alt='Curso'
									onClick={() => handleOpenModal(image.url)}
								/>
							))}
						</Stack>
						<CardMedia
							component='img'
							sx={{
								height: "250px",
								width: "100%",
								"&:hover": {
									transform: "scale(1.05)",
									cursor: "pointer",
									transition: "transform 0.5s ease-in-out",
								},
							}}
							image={images[5]?.url}
							alt='Curso'
							onClick={() => handleOpenModal(images[5]?.url)}
						/>
					</Stack>
				</Stack>
			);
		} else {
			return (
				<Stack direction='row' sx={{ height: "100%", width: "100%", backgroundColor: "#1f1f1f" }}>
					<CardMedia
						component='img'
						sx={{
							height: "100%",
							width: "75%",
							pr: 1,
							"&:hover": {
								transform: "scale(1.05)",
								cursor: "pointer",
								transition: "transform 0.5s ease-in-out",
							},
						}}
						image={images[0]?.url}
						alt='Curso'
						onClick={() => handleOpenModal(images[0]?.url)}
					/>
					<Stack direction='column' sx={{ height: "100%", width: "25%" }}>
						{images.slice(1).map((image, index) => (
							<CardMedia
								key={index}
								component='img'
								sx={{
									pt: index !== 0 && 1,
									height: `${100 / (numImages - 1)}%`,
									width: "100%",
									"&:hover": {
										transform: "scale(1.05)",
										cursor: "pointer",
										transition: "transform 0.5s ease-in-out",
									},
								}}
								image={image.url}
								alt='Curso'
								onClick={() => handleOpenModal(image.url)}
							/>
						))}
					</Stack>
				</Stack>
			);
		}
	};

	const settingsSlider = {
		dots: false,
		infinite: curso?.imagenes?.length > 1,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	if (!curso) {
		return <Box>No hay datos del curso</Box>;
	}

	return (
		<Box sx={{ mt: 5 }}>
			<Card sx={{ maxHeight: 500, mx: "auto", backgroundColor: "#f1f1f1" }}>
				{curso?.isOnlyImage ? (
					<Box sx={{ height: "500px", width: "100%" }}>{renderImages()}</Box>
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
									<CardMedia component='img' sx={{ height: "350px" }} image={file.url} alt='Curso' key={index} onClick={() => handleOpenModal(file.url)} />
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
			<Modal open={modalOpen} onClose={handleCloseModal}>
				<Box
					sx={{
						position: "absolute",
						top: "49%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",

						p: 0,
						maxWidth: "90vw",
						maxHeight: "90vh",
					}}
				>
					<IconButton
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
							color: "grey",
							backgroundColor: "#E2b753",
							"&:hover": { backgroundColor: "#E2b753", transform: "scale(1.1)", cursor: "pointer", transition: "transform 0.3s ease-in-out" },
						}}
						onClick={handleCloseModal}
						aria-label='close'
					>
						<CloseIcon
							sx={{
								"&:hover": {
									transform: "scale(1.2)",
									cursor: "pointer",
									transition: "transform 0.3s ease-in-out",
								},
							}}
						/>
					</IconButton>
					<img src={selectedImage} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 48px)" }} alt='Curso en grande' />
				</Box>
			</Modal>
		</Box>
	);
}

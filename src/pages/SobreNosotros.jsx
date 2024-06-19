import React, { useEffect } from "react";
import { Box, Typography, Fade, Slide, useMediaQuery } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../context/AppProvider";

const SobreNosotros = () => {
	const { setIsLoadingApp } = useAppContext();

	useEffect(() => {
		setIsLoadingApp(false);
	}, []);

	const isSmallScreen = useMediaQuery("(max-width:600px)");
	const [ref, inView] = useInView({
		triggerOnce: true, // La animación se activará solo una vez
		threshold: 0.5, // Cambia este valor según tus necesidades
	});

	const [ref2, inView2] = useInView({
		triggerOnce: true, // La animación se activará solo una vez
		threshold: 0.5, // Cambia este valor según tus necesidades
	});

	const [ref3, inView3] = useInView({
		triggerOnce: true, // La animación se activará solo una vez
		threshold: 0.5, // Cambia este valor según tus necesidades
	});

	return (
		<Box
			sx={{
				backgroundColor: "#1f1f1f",
				color: "#E2b753 ",
				textAlign: "center",
				minHeight: "70vh",
				mt: { xs: 4, sm: 0 },
				overflowX: "hidden",
			}}
		>
			{/* IMAGEN GRANDE */}
			<img
				src='/images/fotos/conocenos.jpg'
				alt='Barberos'
				style={{
					width: "100%",
					height: isSmallScreen ? "35vh" : "90vh",
					display: "block",
				}}
			/>

			{/* CONOCENOS */}

			<Box sx={{ textAlign: "center", mt: { xs: -10, sm: -22 } }}>
				<Fade in={true} timeout={1000}>
					<Typography
						sx={{
							m: "auto",
							fontSize: {
								xs: "2rem",
								sm: "4rem",
							},
							fontFamily: "Century Gothic",
						}}
					>
						¡CONÓCENOS!
					</Typography>
				</Fade>
				<Fade in={true} timeout={2000}>
					<Typography
						color={"white"}
						sx={{
							mt: 0,
							fontSize: { xs: "1rem", sm: "2rem" },
						}}
					>
						Nuestros años de experiencia hablan por sí solos.
					</Typography>
				</Fade>
				{/* CAJA PARA EL TEXTO */}
				<Box ref={ref} sx={{ maxWidth: 800, m: "auto", mb: 2, mt: { xs: 5, sm: 10 } }}>
					<Slide direction='left' in={inView} timeout={500}>
						<Typography
							color='white'
							sx={{
								textAlign: { xs: "justify", sm: "center" },
								mb: 3,
								mx: 3,
								fontSize: { xs: "1.1rem", sm: "1.3rem" },
							}}
						>
							Somos el <span style={{ color: "#E2b753", fontFamily: "Century Gothic" }}>Tío Barbershop</span>, el lugar donde la tradición se encuentra con la modernidad. Nuestro equipo de{" "}
							<span style={{ color: "#E2b753", fontFamily: "Century Gothic" }}>barberos expertos</span> está aquí para brindarte el{" "}
							<span style={{ color: "#E2b753", fontFamily: "Century Gothic" }}>mejor servicio </span>
							en:
						</Typography>
					</Slide>
					<Slide direction='left' in={inView} timeout={800}>
						<Typography
							color='#E2b753'
							sx={{
								textAlign: { sx: "justify", sm: "center" },
								fontSize: { xs: "1.1rem", sm: "1.3rem" },
								fontFamily: "Century Gothic",
							}}
						>
							<strong style={{ fontFamily: "Century Gothic" }}> Corte de cabello y Estilizado de barba.</strong>
						</Typography>
					</Slide>
				</Box>
				{/* VEN Y DESCRUBRE */}
				<br />
				<Box ref={ref2}>
					<Slide direction='right' in={inView2} timeout={1100}>
						<Typography
							ref={ref2}
							color='white'
							sx={{
								mb: 2,
								fontSize: { xs: "1.3rem", sm: "1.5rem" },
								pt: { xs: 0, sm: 2 },
								fontFamily: "Century Gothic",
								mx: 3,
							}}
						>
							Ven y descubre por qué somos la barbería #1.
						</Typography>
					</Slide>
				</Box>
				<Box ref={ref3}>
					<Slide direction='right' in={inView3} timeout={2000}>
						<Typography
							color='white'
							sx={{
								fontSize: { xs: "1.8rem", sm: "2.5rem" },
								pb: 5,
								fontFamily: "Century Gothic",
							}}
						>
							<strong style={{ fontFamily: "Century Gothic" }}>¡Te esperamos!</strong>
						</Typography>
					</Slide>
				</Box>
			</Box>
		</Box>
	);
};

export default SobreNosotros;

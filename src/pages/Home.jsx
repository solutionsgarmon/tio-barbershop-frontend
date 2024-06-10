import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FloatingAddButton from "../components/atoms/FloatingButtons";
import PrincipalSlider from "../components/sliders/PrincipalSlider";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import CardServicesMainSlider from "../components/cards/CardServicesMainSlider";
import Century_Gothic from "../fonts/Century_Gothic.ttf";
import SliderFadeProducts from "../components/sliders/products/SliderFadeProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardServicesMainSliderMob from "../components/cards/CardServicesMainSliderMob";

const MainPage = ({ services, products }) => {
	const { setFlagTransparent, appSettings, windowWidth, setIsLoadingApp } = useAppContext();
	const navigate = useNavigate();

	const settingsSlider = {
		dots: false,
		infinite: false,
		speed: 1000,
		slidesToShow: windowWidth < 800 ? 1.2 : 3,
		slidesToScroll: 1,
	};

	useEffect(() => {
		setFlagTransparent(true);
		setIsLoadingApp(false);
		return () => {
			setFlagTransparent(false);
		};
	}, []);

	const handleClickFloatingButton = () => {
		console.log("handleClickFloatingButton");
		navigate("/citas");
	};

	return (
		<Box sx={{ mt: -10 }}>
			<PrincipalSlider banners={appSettings.main_slider} />

			<Box
				sx={{
					backgroundColor: "#1f1f1f",
					textAlign: "center",
					overflowX: "scroll",
				}}
			>
				<Typography
					gutterBottom
					variant={"h4"}
					component='div'
					sx={{
						textAlign: "center",
						height: 75,
						pt: { xs: 5, sm: 5 },
						pb: { xs: 7, sm: 9 },
						color: "#e2b753",
						fontSize: { xs: "1.5rem", sm: "2rem" },
						fontFamily: "Century Gothic",
					}}
				>
					NUESTROS SERVICIOS
				</Typography>

				{windowWidth > 800 && (
					<Stack sx={{ maxWidth: "100%", mx: 5 }}>
						<Slider {...settingsSlider}>
							{services?.map((servicio, index) => (
								<Box key={index}>{<CardServicesMainSlider servicio={servicio} withButtons={false} windowWidth={windowWidth} />}</Box>
							))}
						</Slider>
					</Stack>
				)}

				{windowWidth <= 800 && (
					<Stack
						direction={"row"}
						sx={{
							overflow: "auto",
							mx: 1,
							"&::-webkit-scrollbar": {
								display: "none",
							},
							"-ms-overflow-style": "none", // IE and Edge
							"scrollbar-width": "none", // Firefox
						}}
					>
						{services?.map((servicio, index) => (
							<Box key={index}>
								<CardServicesMainSliderMob servicio={servicio} withButtons={false} windowWidth={windowWidth} />
							</Box>
						))}
					</Stack>
				)}

				<Typography
					color={"#FFF"}
					sx={{
						fontFamily: "Century Gothic",
						fontSize: { xs: "0.9rem", sm: "1.2rem" },
						py: 3,
						mx: 2,
					}}
				>
					Todos los servicios incluyen mascarilla negra, delineado de cejas y bebida de cortesía.
				</Typography>
			</Box>

			<Box sx={{ backgroundColor: "#333", py: 3, textAlign: "center", m: "auto", px: 0 }}>
				<Typography variant='h4' sx={{ color: "#e2b753", mb: 3 }}>
					CONOCE NUESTROS PRODUCTOS
				</Typography>
				<SliderFadeProducts title='Lo más vendido' products={products} />
				<Button
					variant='outlined'
					color='primary'
					onClick={() => {
						navigate("/tienda");
						setIsLoadingApp(true);
					}}
					sx={{ px: 5, py: 1, mt: { xs: -5, sm: 2 } }}
				>
					Ver más
				</Button>
			</Box>

			{/* <Box
        sx={{
          backgroundColor: "#1f1f1f",
          width: "100%",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography
          gutterBottom
          variant={"h4"}
          component="div"
          sx={{
            height: 75,
            mt: { xs: 5, sm: 3 },
            mb: { xs: 5, sm: 0 },
            color: "#e2b753",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          CLIENTES QUE NOS RECOMIENDAN
        </Typography>

        <AutoplaySlider />
      </Box> */}

			<FloatingAddButton handleClickFloatingButton={handleClickFloatingButton} />
		</Box>
	);
};

export default MainPage;

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

const settingsSlider = {
	dots: false,
	infinite: false,
	speed: 1000,
	slidesToShow: 2,
	slidesToScroll: 1,
};

const MainPage = ({ services, products }) => {
	const { setFlagTransparent, appSettings } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		setFlagTransparent(true);

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
					height: "560px", //ALTURA DEL BOX NEGRO

					textAlign: "center",
					overflowX: "scroll",
					WebkitOverflowScrolling: "touch",
					maxWidth: "100%",
					"&::-webkit-scrollbar": { height: "5px" },
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
				<Box
					sx={{
						overflowX: "auto",
						textAlign: "center",
						"&::-webkit-scrollbar": { height: "6px" },
					}}
				>
					<Stack direction={"row"} spacing={2} sx={{ mx: 1.5 }}>
						<Slider {...settingsSlider}></Slider>
						{services?.map((servicio, index) => (
							<Box key={index} sx={{ m: 2 }}>
								<CardServicesMainSlider servicio={servicio} withButtons={false} />
							</Box>
						))}
					</Stack>
				</Box>
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

			<Box sx={{ backgroundColor: "#333", py: 3, textAlign: "center", m: "auto", mt: 10 }}>
				<Typography variant='h4' sx={{ color: "#e2b753", mb: 3 }}>
					PRUDUCTOS MAS VENDIDOS
				</Typography>
				<SliderFadeProducts title='Lo más vendido' products={products} />
				<Button variant='outlined' color='primary' onClick={() => navigate("/tienda")} sx={{ px: 5, py: 1, mt: { xs: -5, sm: 2 } }}>
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

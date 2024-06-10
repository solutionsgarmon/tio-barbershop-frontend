import React, { useState, useEffect } from "react";
import { Avatar, Typography, Button, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { useAppContext } from "../../../context/AppProvider";

// Definir animación de fade
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SliderFeaturesProducts = ({ products, setProductSel, setShowNModalVizualizator }) => {
	const { windowWidth } = useAppContext();
	const [index, setIndex] = useState(0);
	const [show, setShow] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShow(false); // Iniciar animación de desvanecimiento
			setTimeout(() => {
				setIndex((prevIndex) => (prevIndex + 1) % products.length);
				setShow(true); // Mostrar el siguiente producto después de que termine la animación
			}, 500); // Duración de la animación de desvanecimiento
		}, 5000); // Cambiar cada 5 segundos

		return () => clearInterval(interval);
	}, [products.length]);

	return (
		<Stack
			direction={{ xs: "column", md: "row" }}
			sx={{
				justifyContent: "center",
				alignItems: "center",
				mb: 5,
				textAlign: "center",
				maxWidth: 800,
				mx: "auto",
				px: 3,
			}}
		>
			<Avatar
				src={products[index]?.imagenes[0].url}
				sx={{
					borderRadius: 5,
					mx: "auto",
					height: { xs: 200, sm: 300 },
					width: { xs: 200, sm: 300 },
					animation: show ? `${fadeIn} 0.3s ease-in-out forwards` : `${fadeOut} 0.3s ease-in-out forwards`,
				}}
			/>
			<Stack
				direction={"column"}
				sx={{
					justifyContent: "center",
					alignItems: "center",
					mx: 2,
					mt: { xs: 0, sm: 0 },
					animation: show ? `${fadeIn} 0.3s ease-in-out forwards` : `${fadeOut} 0.3s ease-in-out forwards`,
				}}
			>
				<Typography maxWidth={400} color={"primary"} sx={{ fontSize: "1.8rem", my: 3, ml: { xs: 0, sm: 5 } }}>
					{products[index]?.nombre}
				</Typography>
				{windowWidth < 800 && (
					<Typography maxWidth={400} color={"white"} sx={{ textAlign: "center", fontSize: "1rem" }}>
						{products[index]?.descripcion.length > 110 ? products[index]?.descripcion.slice(0, 110) + "..." : products[index]?.descripcion}
					</Typography>
				)}
				{windowWidth >= 800 && (
					<Typography variant='h6' maxWidth={400} color={"white"} sx={{ textAlign: "center", ml: 5 }}>
						{products[index]?.descripcion}
					</Typography>
				)}
				<Button
					color='primary'
					onClick={() => {
						setProductSel(products[index]);
						setShowNModalVizualizator(true);
					}}
					variant='contained'
					sx={{ py: 1, px: 4, mt: 4 }}
				>
					Ver Detalles
				</Button>
			</Stack>
		</Stack>
	);
};

export default SliderFeaturesProducts;

import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppProvider";
import { Box, Stack } from "@mui/material";
import ElementCategoria from "./ElementCategoria";

const SliderCategorias = () => {
	const { categories } = useAppContext();

	return (
		<Stack
			direction='row'
			spacing={{ xs: 0, sm: 2 }} // Espacio entre los elementos
			sx={{
				m: "auto",
				textAlign: "center",
				width: { xs: "100%", sm: "90%" },
				overflowX: "hidden", // Oculta la barra de desplazamiento
				flexWrap: "nowrap", // Evita el ajuste automático del contenido
				my: 1,
				WebkitOverflowScrolling: "touch", // Desplazamiento suave en dispositivos móviles
				"&::-webkit-scrollbar": {
					display: "none", // Oculta la barra de desplazamiento en navegadores WebKit
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					overflowX: "auto", // Habilita el desplazamiento horizontal
					WebkitOverflowScrolling: "touch", // Desplazamiento suave en dispositivos móviles
					"&::-webkit-scrollbar": {
						display: "none", // Oculta la barra de desplazamiento en navegadores WebKit
					},
				}}
			>
				{categories.map((category, index) => (
					<ElementCategoria key={index} image={category.image} name={category.name} />
				))}
			</Box>
		</Stack>
	);
};

export default SliderCategorias;

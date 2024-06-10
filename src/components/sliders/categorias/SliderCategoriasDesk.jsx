import React from "react";
import { useAppContext } from "../../../context/AppProvider";
import ElementCategoria from "./ElementCategoria";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/joy";

const SliderCategoriasDesk = () => {
	const { categories } = useAppContext();

	const settingsPC = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 12, // Ajusta el número de elementos visibles en cada slide
		slidesToScroll: 6,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Box sx={{ mx: 10, mt: 5, mb: 2 }}>
			<Slider {...settingsPC}>
				{categories.map((category, index) => (
					<ElementCategoria key={index} image={category.image} name={category.name} />
				))}
			</Slider>
		</Box>
	);
};

export default SliderCategoriasDesk;

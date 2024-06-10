import { Avatar, Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useAppContext } from "../../../context/AppProvider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ElementProductDesk from "./ElementProductDesk";
import ElementProductMob from "./ElementProductMob";
import { useState } from "react";
import { useEffect } from "react";
import VizualizatorProductMob from "../../modals/VizualizatorProductMob";
import VizualizatorProductDesk from "../../modals/VizualizatorProductDesk";
import SliderFeaturesProducts from "./SliderFeaturesProducts";
import CardProduct from "../../cards/CardProduct";

const SliderFadeProducts = ({ products, title }) => {
	const { windowWidth } = useAppContext();
	const [isLoading, setIsLoading] = useState(true);
	const [showNModalVizualizator, setShowNModalVizualizator] = useState(false);
	const [productSel, setProductSel] = useState(null);
	const handleCloseModalVizualizator = () => {
		setShowNModalVizualizator(false);
	};

	useEffect(() => {
		console.log("products", products);
		setIsLoading(false);
	}, []);

	const settingsSlider = {
		dots: false,
		infinite: false,
		speed: 1000,
		slidesToShow: 6,
		slidesToScroll: 2,
	};

	return (
		<Box>
			{isLoading ? (
				<Skeleton variant='rectangular' height={200} animation='wave' />
			) : (
				<>
					<Box>
						<SliderFeaturesProducts products={products} setProductSel={setProductSel} setShowNModalVizualizator={setShowNModalVizualizator} />
					</Box>
					{windowWidth < 800 && (
						<Box
							sx={{
								height: 320,
								mx: 1,
								overflowY: "auto",
								WebkitOverflowScrolling: "touch", // Propiedad específica para mejorar el desplazamiento en dispositivos táctiles
								"&::-webkit-scrollbar": {
									display: "none", // Oculta la barra de desplazamiento en navegadores webkit (como Chrome y Safari)
								},
								scrollbarWidth: "none", // Oculta la barra de desplazamiento en Firefox
							}}
						>
							<Stack direction='row'>
								{products?.map((product, itemIndex) => (
									<Box
										key={`SlidersItems-ElementProductMob-${itemIndex}`}
										onClick={() => {
											setProductSel(product);
											setShowNModalVizualizator(true);
										}}
									>
										<ElementProductMob key={`SlidersItems-ElementProductMob-${itemIndex}`} product={product} />
									</Box>
								))}
							</Stack>
						</Box>
					)}

					{windowWidth >= 800 && (
						<Stack sx={{ maxWidth: "100%", mx: 6 }}>
							<Slider {...settingsSlider}>
								{products?.map((product, itemIndex) => (
									<Box
										onClick={() => {
											setProductSel(product);
											setShowNModalVizualizator(true);
										}}
									>
										<ElementProductDesk key={`SlidersItems-ElementProductDesk-${itemIndex}`} product={product} />
									</Box>
								))}
							</Slider>
						</Stack>
					)}
				</>
			)}

			{/* -------MODALS---------- */}
			{windowWidth < 800 ? (
				<VizualizatorProductMob open={showNModalVizualizator} handleClose={handleCloseModalVizualizator} product={productSel} />
			) : (
				<VizualizatorProductDesk open={showNModalVizualizator} handleClose={handleCloseModalVizualizator} product={productSel} />
			)}
		</Box>
	);
};

export default SliderFadeProducts;

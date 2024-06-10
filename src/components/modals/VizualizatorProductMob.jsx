import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Box, Stack, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "../../context/AppProvider";

const VizualizatorProductMob = ({ handleClose, open, product }) => {
	const { sessionDataStorage, setSessionDataStorage } = useAppContext();
	const [presentationSel, setPresentationSel] = useState(null);
	const [isInShoppingCart, setIsInShoppingCart] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		if (product) {
			setPresentationSel(product.imagenes[0]);
		}
	}, [product]);

	const handleButtonOK = () => {};

	const settingsSlider = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Dialog fullWidth open={open} onClose={handleClose} maxWidth='lg'>
			<DialogTitle
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: "#E2b753",
					// backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/017/348/780/non_2x/comic-background-pop-art-texture-starburst-cartoon-style-manga-anime-design-with-explosion-or-action-effect-for-print-orange-backdrop-with-halftone-gradient-funny-line-frame-illustration-vector.jpg)'
				}}
			>
				{/* <Avatar src={"/images/icon-tio.png"} sx={{ width: 60, height: 60, p: 0, my: -2 }} /> */}
				<Typography style={{ fontSize: "25px" }}>
					<strong>Producto</strong>
				</Typography>
				<IconButton
					onClick={handleClose}
					style={{
						color: "white",
						borderRadius: "50%",
						padding: "5px",
						backgroundColor: "#d32f2f",
						transition: "background-color 0.3s",
					}}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
				>
					<CloseIcon sx={{ width: 30, height: 30 }} />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Box sx={{ flexGrow: 1, mt: 2, mx: 0 }}>
					<Box
						sx={{
							mb: 3,
							border: 1,
							borderColor: "grey.300", // Cambia esto a cualquier tono de gris que prefieras
							borderRadius: "8px", // Ajusta el radio del borde redondeado según tu preferencia
							borderWidth: "1px", // Ajusta el grosor del borde
							borderStyle: "solid",
						}}
					>
						<Slider {...settingsSlider}>
							{product?.imagenes.map((file, index) => {
								return (
									<Box
										key={index}
										sx={{
											position: "relative", // Para que el icono se posicione relativo a este contenedor
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "100%",
											height: "250px", // Altura fija para las imágenes
											overflow: "hidden", // Oculta cualquier parte de la imagen que sobresalga
										}}
									>
										<FavoriteIcon
											color='primary'
											sx={{
												mt: 1,
												ml: 1,
												zIndex: 1,
												mr: 1,
												position: "absolute",
												top: "8px", // Ajusta según el margen que desees
												right: "8px",
											}}
											onClick={(e) => {
												e.stopPropagation();
												//  handleRemoveFromFavorites();
											}}
										/>
										<img
											src={file.url}
											alt={`Thumbnail ${index}`}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover", // Ajusta la imagen para cubrir completamente el área del contenedor
											}}
											onClick={() => setPresentationSel(file)}
										/>
									</Box>
								);

								return null;
							})}
						</Slider>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1, mx: 0, textAlign: "center" }}>
						<Typography variant='h6'>
							<strong>{product?.nombre.toUpperCase()}</strong>
						</Typography>
						<Typography sx={{ textAlign: "justify", mt: 0 }}>{product?.descripcion}</Typography>
						{/* <Stack direction={"column"} sx={{ mt: 2 }}>
							<Button variant='contained' color='primary' onClick={handleButtonOK} sx={{ mb: 2, py: 2, color: "#fff" }}>
								Comprar
							</Button>
							<Button variant='outlined' color='primary' onClick={handleButtonOK} sx={{ py: 2 }}>
								Agregar al carrito
							</Button>
						</Stack> */}
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default VizualizatorProductMob;

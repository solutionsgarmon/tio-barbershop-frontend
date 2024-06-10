import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MyRatingBar from "../../atoms/MyRatingBar";
import { useAppContext } from "../../../context/AppProvider";
import { useNavigate } from "react-router-dom";

const ElementProductMob = ({ product }) => {
	const { cart, isInCart, favorites, isInFavorites } = useAppContext();
	const [isFavorite, setIsFavorite] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [isAddedToCart, setIsAddedToCart] = useState(false);
	const [imagen, setImagen] = useState("");
	const navigate = useNavigate();

	//Verificar si está en el carrito
	// useEffect(() => {
	// 	if (product) {
	// 		isInCart(product._id) ? setIsAddedToCart(true) : setIsAddedToCart(false);
	// 	}
	// }, [cart]);

	//Verificar si está en Favoritos

	// useEffect(() => {
	// 	if (product) {
	// 		isInFavorites(product._id) ? setIsFavorite(true) : setIsFavorite(false);
	// 	}
	// }, [favorites]);

	const handleClickArea = () => {
		//navigate("/ecommerce/detalle/" + product._id);
	};

	const handleAddFavorite = () => {
		//addToFavorites(product);
		// showToastExito("Agregado a Favoritos 💖");
	};

	const handleAddCart = () => {
		//addToCart(product);
		// showToastExito("Agregado al Carrito 🛒");
	};

	const handleRemoveFromCart = () => {
		// removeFromCart(product._id);
	};

	const handleRemoveFromFavorites = () => {
		//removeFromFavorites(product._id);
	};

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				mx: 0.5,
				width: 150,
				position: "relative",
				backgroundColor: "rgba(255, 255, 255, 0)", // 0.5 indica una transparencia del 50%
			}}
		>
			<CardActionArea
				onClick={handleClickArea}
				sx={{ border: 1, borderColor: "#fff " }}
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
			>
				<Stack direction='row' sx={{ justifyContent: "flex-end" }}>
					{isFavorite && (
						// <ShoppingCartIcon
						//   color="primary"
						//   sx={{ mt: 1, ml: 1, zIndex: 1 }}
						//   onClick={(e) => {
						//     e.stopPropagation();
						//     handleRemoveFromCart();
						//   }}
						// />
						<FavoriteIcon
							color='primary'
							sx={{ mt: 1, ml: 1, zIndex: 1, mr: 2 }}
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveFromFavorites();
							}}
						/>
					)}
					{!isFavorite && (
						// <AddShoppingCartIcon
						//   color="primary"
						//   sx={{ mt: 1, ml: 1, zIndex: 1 }}
						//   onClick={(e) => {
						//     e.stopPropagation();
						//     handleAddCart();
						//   }}
						// />
						<FavoriteBorderIcon
							color='primary'
							sx={{ mt: 1, ml: 1, zIndex: 1, mr: 1 }}
							onClick={(e) => {
								e.stopPropagation();
								handleAddFavorite();
							}}
						/>
					)}

					{/* <MyRatingBar rating={4} /> */}
				</Stack>

				<CardMedia
					component='img'
					image={imagen ? imagen : product?.imagenes[0].url}
					alt='producto'
					sx={{
						width: 145,
						height: 145,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
						mt: -4,

						// border:1
					}}
				/>
				{/* <hr style={{    /> */}

				<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: -2, mt: -1, textAlign: "center" }}>
					<Typography color={isHover ? "primary" : "#FFF"} variant='body2' sx={{ height: 50, fontFamily: "Lato", fontSize: "0.9rem", m: "auto", mb: 1, mx: 1 }}>
						{product?.descripcion.length > 80 ? product?.descripcion.slice(0, 80) + "..." : product?.descripcion}
					</Typography>
					<Stack direction='row' sx={{ justifyContent: "center", mt: 1, backgroundColor: "#E2b753", width: "100%", mb: -2 }}>
						<Typography variant='h5' color='#000' sx={{ fontFamily: "Arial, sans-serif", fontSize: "1.2rem", textAlign: "center" }}>
							<strong>${Math.round(parseFloat(product?.precio)).toLocaleString()}</strong>
						</Typography>
						{/* <Typography variant='body2' color='#000' sx={{ fontFamily: "Arial, sans-serif", textAlign: "center", ml: 0.1 }}>
							{"00"}
						</Typography> */}
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ElementProductMob;

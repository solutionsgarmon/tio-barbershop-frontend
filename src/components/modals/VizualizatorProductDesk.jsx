import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Box, Stack, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addToCart, removeFromCart } from "../../helpers/db";
import { getFromLocalStorage } from "../../helpers/localStorageHelper";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppProvider";

const VizualizatorProductDesk = ({ handleClose, open, product }) => {
	const { sessionDataStorage, setSessionDataStorage } = useAppContext();
	const [presentationSel, setPresentationSel] = useState(null);
	const [isInShoppingCart, setIsInShoppingCart] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		if (product) {
			setPresentationSel(product.imagenes[0]);
		}
		// Check if the product is in the shopping cart
		// const isProductInCart = sessionDataStorage?.shopping_cart?.find((cartItem) => cartItem._id === product._id);
		// setIsInShoppingCart(!!isProductInCart);
	}, [product]);

	const handleButtonOK = () => {};
	const handleAddToCart = async () => {
		if (sessionDataStorage?._id) {
			// está logeado
			const resp = await addToCart(sessionDataStorage, product);

			if (resp.data.success) {
				toast.success("Agregado al carrito");
				//Actualizar storage de usuario
				let newSessionDataStorage = { ...sessionDataStorage };
				newSessionDataStorage.shopping_cart.push(product);
				setSessionDataStorage(newSessionDataStorage);
				setReload((prev) => !prev);
			} else {
				toast.error("Error al agregar carrito");
			}
		} else {
			//No esta logeado
		}
	};

	const handleRemoveToCart = async () => {
		if (sessionDataStorage?._id) {
			// está logeado
			const resp = await removeFromCart(sessionDataStorage, product);
			if (resp.data.success) {
				console.log("resp.data", resp.data);
				toast.success("Removido del carrito");
				//Actualizar storage de usuario
				let newSessionDataStorage = { ...sessionDataStorage };
				newSessionDataStorage.shopping_cart = resp.data.data.shopping_cart;
				setSessionDataStorage(newSessionDataStorage);
				setReload((prev) => !prev);
			} else {
				toast.error("Error al agregar carrito");
			}
		} else {
			//No esta logeado
		}
	};

	return (
		<Dialog fullWidth open={open} onClose={handleClose} maxWidth='lg'>
			<DialogTitle
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: "#E2b753",
					// backgroundImage:
					// 	"url(https://static.vecteezy.com/system/resources/previews/017/348/780/non_2x/comic-background-pop-art-texture-starburst-cartoon-style-manga-anime-design-with-explosion-or-action-effect-for-print-orange-backdrop-with-halftone-gradient-funny-line-frame-illustration-vector.jpg)",
				}}
			>
				{/* <Avatar src={"/images/icon-tio.png"} sx={{ width: 60, height: 60, p: 0, my: -2 }} /> */}
				<Typography style={{ fontSize: "25px" }}>
					<strong>Acerca del Producto</strong>
				</Typography>
				<IconButton
					onClick={handleClose}
					style={{
						color: "white",
						borderRadius: "50%",
						padding: "5px",
						backgroundColor: "#d32f2f", // Fondo rojo para resaltar
						transition: "background-color 0.3s",
					}}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")} // Cambio de fondo al pasar el cursor
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")} // Volver al fondo original
				>
					<CloseIcon sx={{ width: 30, height: 30 }} />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ backgroundColor: "#1f1f1f" }}>
				<Box>
					<Grid container spacing={2} sx={{ mt: 0 }}>
						{/* Columna de Miniaturas */}
						<Grid item xs={1}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: 1,
								}}
							>
								{product?.imagenes.map((file, index) => {
									return (
										<img
											key={index}
											src={file.url}
											alt={`Thumbnail ${index}`}
											style={{
												width: "70px",
												height: "70px",
												cursor: "pointer",
												borderRadius: "8px",

												//boxShadow: file === presentationSel ? "0 0 10px #E2b753" : "0 0 5px #ccc",
												border: file === presentationSel ? "2px solid #E2b753" : "2px solid transparent",
												marginBottom: "10px",
												transition: "transform 0.2s, box-shadow 0.2s",
												transform: file === presentationSel ? "scale(1.05)" : "scale(1)",
												objectFit: "cover", // Ensure image fits within the box
											}}
											onClick={() => setPresentationSel(file)}
										/>
									);

									return null;
								})}
							</Box>
						</Grid>

						{/* Columna de Imagen Seleccionada */}
						<Grid item xs={6}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
								}}
							>
								{presentationSel && (
									<img
										src={presentationSel.url}
										alt='Selected'
										style={{
											width: "100%",
											maxHeight: "500px",
											objectFit: "contain",
											borderRadius: "8px",
											boxShadow: "0 0 3px #ccc",
										}}
									/>
								)}
							</Box>
						</Grid>

						{/* Columna de Descripción y Botones */}
						<Grid item xs={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mx: 4 }}>
								<Typography variant='h4' color='#f5c632' sx={{ textAlign: "center" }}>
									{product?.nombre}
								</Typography>
								<Typography color='#FFF' sx={{ textAlign: "justify", mt: 2, fontSize: "1.5rem", overflowY: "auto" }}>
									{product?.descripcion}
								</Typography>

								{/* Botones */}
								{/* <Stack direction={"column"} sx={{ mt: 2 }}>
									<Button variant='contained' color='secondary' onClick={handleButtonOK} sx={{ mb: 2, py: 2 }}>
										Comprar
									</Button>
									<Button variant='contained' color='primary' onClick={isInShoppingCart ? handleRemoveToCart : handleAddToCart} sx={{ py: 2 }}>
										{isInShoppingCart ? "Quitar del carrito" : "Agregar al carrito"}
									</Button>
								</Stack> */}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default VizualizatorProductDesk;

import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Box, Stack, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VizualizatorProductMob = ({ handleClose, open, product }) => {
	const [presentationSel, setPresentationSel] = useState(null);

	useEffect(() => {
		if (product) {
			setPresentationSel(product.presentations[0]?.files.find((file) => file.fileType === "IMAGE"));
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
					backgroundColor: "#E2b753",
					color: "white",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundImage:
						"url(https://static.vecteezy.com/system/resources/previews/017/348/780/non_2x/comic-background-pop-art-texture-starburst-cartoon-style-manga-anime-design-with-explosion-or-action-effect-for-print-orange-backdrop-with-halftone-gradient-funny-line-frame-illustration-vector.jpg)",
				}}
			>
				<Avatar src={"/images/icons/animazing-logo2.png"} sx={{ width: 60, height: 60, p: 0, my: -2 }} />
				{/*    <Typography style={{ fontSize: "20px" }}>
       <strong>{product?.details.name.toUpperCase()}</strong> 
         A N I M A Z I N G 
        </Typography>*/}
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
			<DialogContent>
				<Box sx={{ flexGrow: 1, mt: 2, mx: 0 }}>
					<Grid container spacing={2}>
						{/* Columna de Imagen Seleccionada */}
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									mx: -1,
								}}
							>
								{presentationSel && (
									<img
										src={presentationSel.path}
										alt='Selected'
										style={{
											width: "100%",
											maxHeight: "300px",
											objectFit: "contain",
											borderRadius: "8px",
											boxShadow: "0 0 10px #ccc",
										}}
									/>
								)}
							</Box>
						</Grid>

						{/* Columna de Miniaturas */}
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									gap: 1,
								}}
							>
								{product?.presentations[0]?.files.map((file, index) => {
									if (file.fileType === "IMAGE") {
										return (
											<img
												key={index}
												src={file.path}
												alt={`Thumbnail ${index}`}
												style={{
													width: "50px",
													height: "50px",
													cursor: "pointer",
													borderRadius: "8px",
													boxShadow: file === presentationSel ? "0 0 10px #E2b753" : "0 0 5px #ccc",
													border: file === presentationSel ? "2px solid #E2b753" : "2px solid transparent",
													marginBottom: "10px",
													transition: "transform 0.2s, box-shadow 0.2s",
													transform: file === presentationSel ? "scale(1.05)" : "scale(1)",
													objectFit: "cover", // Ensure image fits within the box
												}}
												onClick={() => setPresentationSel(file)}
											/>
										);
									}
									return null;
								})}
							</Box>
						</Grid>

						{/* Columna de Descripción y Botones */}
						<Grid item xs={12}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mx: 0 }}>
								<Typography variant='h4'>{product?.details.name}</Typography>
								<Typography variant='h6' sx={{ textAlign: "justify", mt: 2 }}>
									{product?.details.description}
								</Typography>
								{/* <Stack direction={"column"} sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleButtonOK} sx={{ mb: 2, py: 2, bgcolor: "#1f1f1f", color: "#fff" }}>
                    Comprar
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleButtonOK} sx={{ py: 2 }}>
                    Agregar al carrito
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

export default VizualizatorProductMob;

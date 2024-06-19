import { Box, Button, Paper, Skeleton, Stack, Alert, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Stepper from "../components/molecules/Stepper";
import { getBarbers, getBarbershops, getServices } from "../api/gets";
import { useAppContext } from "../context/AppProvider";
import CitasSeleccionBarbero from "../views/CitasSeleccionBarbero";
import CitasSeleccionServicio from "../views/CitasSeleccionServicio";
import CitasSeleccionHora from "../views/CitasSeleccionHora";
import CitasConfirmacion from "../views/CitasConfirmacion";
import CardCitaBarbershop from "../components/cards/CardCitaBarbershop";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";

const STEPS = ["Barbería", "Barbero", "Servicio", "Hora", "Confirmación"];

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const Citas = () => {
	const { isLoadingApp, setIsLoadingApp, sessionDataStorage, barbershops } = useAppContext();
	const [dataCita, setDataCita] = useState({
		barberia: "",
		id_barberia: "",
		servicio: "",
		id_servicio: "",
		costo: "",
		duracion: "",
		barbero: "",
		id_barbero: "",
		imagen_barbero: "",
		hora: "",
		fecha: "",
		nombre_cliente: "",
		telefono_cliente: "",
		correo_cliente: "",
		imagen_cliente: "",
	});
	const [currentStep, setCurrentStep] = useState(0);
	const [barbers, setBarbers] = useState([]);
	const [services, setServices] = useState([]);
	const [confirmacion, setConfirmacion] = useState(false);
	const [enableButton, setEnableButton] = useState(false);
	const [reload, setReload] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (sessionDataStorage?.rol === "BARBERO") {
			if (sessionDataStorage.barberias_asignadas.length > 1) {
				console.log(">>ES BARBERO Y TIENE MAS DE 1 BARBERIA");
				const htmlContent = sessionDataStorage.barberias_asignadas
					.map((barberiaAsignada) => {
						const barberia = barbershops.find((b) => b._id === barberiaAsignada.idBarberia);
						return `
								<div style="margin-bottom: 5px; padding: 5px; border: 1px solid #ddd; border-radius: 5px; position: relative; text-align: center;">
										<h4>${barberia?.nombre ?? "Nombre no disponible"}</h4>
									<img src="${barberia?.imagenes?.[0]?.url}" width="150px" style="border-radius: 10px;" />
										<button onclick="selectBarberia('${barberia?._id}')" style="background-color: #E2b753; 
														border: none;
														color: white;
														padding: 20px 24px;
														text-align: center;
														text-decoration: none;
														display: inline-block;
														font-size: 18px;
														margin: 4px 2px;
														margin-left:0px;
														cursor: pointer;
														border-radius: 12px;
														transition-duration: 0.4s;">SELECCIONAR</button>
									</div>
					`;
					})
					.join("");

				Swal.fire({
					title: "Tus barberías Asignadas",
					html: htmlContent,
					showConfirmButton: false,
					didOpen: () => {
						window.selectBarberia = (barberiaId) => {
							Swal.close();
							const nombreBarberia = barbershops.find((barbershop) => barbershop._id === barberiaId)?.nombre ?? "";
							setDataCita((prevDataCita) => ({
								...prevDataCita,
								barberia: nombreBarberia,
								id_barberia: barberiaId,
								barbero: sessionDataStorage.nombre,
								id_barbero: sessionDataStorage._id,
								imagen_barbero: sessionDataStorage.imagenes?.[0]?.url ?? "",
							}));
							setCurrentStep(2);
						};
					},
				});
			} else {
				console.log(">>ES BARBERO Y SU BARBERIA ES  1");
				setDataCita((prevData) => ({
					...prevData,
					barberia: sessionDataStorage.barberias_asignadas[0].nombreBarberia,
					id_barberia: sessionDataStorage.barberias_asignadas[0].idBarberia,
					barbero: sessionDataStorage.nombre,
					id_barbero: sessionDataStorage._id,
					imagen_barbero: sessionDataStorage.imagenes?.[0]?.url ?? "",
				}));
				setCurrentStep(2);
			}
		} else if (sessionDataStorage?.rol === "CLIENTE") {
			console.log(">>ES CLIENTE");
			setDataCita((prevData) => ({
				...prevData,
				nombre_cliente: sessionDataStorage.nombre || "",
				telefono_cliente: sessionDataStorage.telefono || "",
				correo_cliente: sessionDataStorage.correo || "",
				imagen_cliente: sessionDataStorage.imagen || "",
			}));
		}
	}, [sessionDataStorage, barbershops, reload]);

	useEffect(() => {
		console.log(">> dataCita >>", dataCita);
	}, [dataCita]);

	useEffect(() => {
		setIsLoadingApp(false);
		async function fetchData() {
			setBarbers(await getBarbers());
			setServices(await getServices());
		}
		fetchData();
	}, []);

	const handleSelectBarbershop = (barberia) => {
		//console.log("handleSelectBarbershop", handleSelectBarbershop);
		setDataCita((prevDataCita) => ({
			...prevDataCita,
			barberia: barberia.nombre,
			id_barberia: barberia._id,
		}));
		setEnableButton(true);
	};

	const handleContinue = () => {
		setCurrentStep(currentStep + 1);
		setEnableButton(false);
		scrollToTop();
	};

	const handleBack = () => {
		setCurrentStep(currentStep - 1);
	};

	return (
		<Box
			sx={{
				m: "auto",
				minHeight: "85vh",
				maxWidth: 1000,
				textAlign: "center",
				my: 4,
				mt: { xs: 6, sm: 3 },
			}}
		>
			<Paper sx={{ pt: 2, pb: 1, mt: { xs: -1.5, sm: 1 }, mb: 3 }}>
				<Stepper steps={STEPS} currenStep={currentStep} />
				{!sessionDataStorage && (
					<Alert variant='filled' severity='warning' sx={{ mt: 1, mx: 1 }}>
						<Typography
							sx={{
								fontSize: { xs: "0.7rem", sm: "1rem" },
								fontFamily: "Century Gothic",
							}}
						>
							Usted no está autenticado, aún así su cita si se guardará, si desea consultarla o modificarla deberá crear una cuenta con el e-mail registrado en el formulario.
						</Typography>
					</Alert>
				)}
			</Paper>
			{isLoadingApp ? (
				<Stack direction={"row"} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
					<Skeleton variant='text' width={350} height={350} sx={{ mx: 2 }} />
					<Skeleton variant='text' width={350} height={350} sx={{ mx: 2 }} />
					<Skeleton variant='text' width={350} height={350} sx={{ mx: 2 }} />
				</Stack>
			) : (
				<>
					{currentStep === 0 && (
						<Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
							{barbershops?.map(
								(element, index) =>
									index % 2 === 0 && (
										<React.Fragment key={element._id}>
											<Box sx={{ m: 1, maxWidth: 350 }}>
												<CardCitaBarbershop barbershop={element} onSelect={handleSelectBarbershop} dataCita={dataCita} />
											</Box>
											{index + 1 < barbershops.length && (
												<Box sx={{ m: 1, maxWidth: 350 }}>
													<CardCitaBarbershop barbershop={barbershops[index + 1]} onSelect={handleSelectBarbershop} dataCita={dataCita} />
												</Box>
											)}
										</React.Fragment>
									)
							)}
						</Box>
					)}

					{currentStep !== 0 && (
						<Box sx={{ mt: 2 }}>
							{currentStep === 1 && <CitasSeleccionBarbero dataCita={dataCita} setEnableButton={setEnableButton} setDataCita={setDataCita} barbers={barbers} />}
							{currentStep === 2 && <CitasSeleccionServicio services={services} dataCita={dataCita} setEnableButton={setEnableButton} setDataCita={setDataCita} />}
							{currentStep === 3 && <CitasSeleccionHora setEnableButton={setEnableButton} setDataCita={setDataCita} dataCita={dataCita} />}
							{currentStep === 4 && <CitasConfirmacion setEnableButton={setEnableButton} setDataCita={setDataCita} dataCita={dataCita} confirmacion={confirmacion} setConfirmacion={setConfirmacion} />}
						</Box>
					)}
					<Stack onClick={scrollToTop} direction={"row"} sx={{ textAlign: "center", mt: 5, mx: { xs: 2, sm: 10 } }}>
						{sessionDataStorage?.rol === "BARBERO" ? (
							<>
								{/* BOTON ATRAS */}
								{sessionDataStorage?.rol === "BARBERO" && currentStep != 2 && currentStep != 0 && (
									<Button variant='outlined' onClick={handleBack} sx={{ px: { xs: 3, sm: 10 } }}>
										<ArrowBackIcon />
										&nbsp;Atrás
									</Button>
								)}

								{sessionDataStorage?.rol === "BARBERO" && currentStep == 2 && sessionDataStorage.barberias_asignadas.length > 1 && (
									<Button
										sx={{ px: { xs: 3, sm: 10 } }}
										onClick={() => {
											setReload((prev) => !prev);
											setCurrentStep(0);
										}}
									>
										<ArrowBackIcon />
										&nbsp;Atrás
									</Button>
								)}
							</>
						) : (
							<>
								{currentStep != 0 && (
									<Button variant='outlined' onClick={handleBack} sx={{ px: { xs: 3, sm: 10 } }}>
										<ArrowBackIcon />
										&nbsp;Atrás
									</Button>
								)}
							</>
						)}
						{currentStep === STEPS.length - 1 ? (
							<Button
								variant='contained'
								onClick={(event) => {
									setConfirmacion(true);
									// setIsLoadingApp(true);

									event.stopPropagation();
								}}
								fullWidth
								sx={{ py: 1, ml: 1 }}
							>
								Confirmar cita &nbsp; <EventIcon />
							</Button>
						) : (
							<>
								<Button variant='contained' onClick={handleContinue} disabled={!enableButton} fullWidth sx={{ py: 1, ml: 1, fontFamily: "Century Gothic" }}>
									Siguiente Paso &nbsp; <ArrowForwardIcon />
								</Button>
							</>
						)}
					</Stack>
				</>
			)}
		</Box>
	);
};

export default Citas;

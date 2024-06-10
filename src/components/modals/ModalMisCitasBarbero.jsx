import React, { useState, useEffect } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Card, CardContent, Box, Avatar, Select, MenuItem, Paper, IconButton, Skeleton } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import { postCitaregistro } from "../../api/posts";
import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { sumarMinutosAHora } from "../../helpers/fechaYhora";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import { getCitas, getCitasByCorreo, getCitasRegistroByCorreo, getCitasCanceladasByIdBarbero, getCitasCompletadasByIdBarbero, getCitasPendientesByIdBarbero } from "../../api/gets";
import { deleteCita } from "../../api/deletes";

const ModalMisCitasBarbero = ({ handleClose, open, handleOk }) => {
	const { setIsLoadingApp, sessionDataStorage, isLoadingApp } = useAppContext();
	const [filtroCitas, setFiltroCitas] = useState("PENDIENTE");
	const [citasFiltradas, setCitasFiltradas] = useState([]);
	const [fechaSel, setFechaSel] = useState(dayjs());
	const [fechasUnicas, setFechasUnicas] = useState([]);
	const [reload, setReload] = useState(false);
	const [fechasPermitidas, setFechasPermitidas] = useState([]);

	useEffect(() => {
		// Configura el intervalo para que ejecute handleReload cada 5 minutos (300000 ms)
		const intervalId = setInterval(handleReload, 300000);

		return () => clearInterval(intervalId);
	}, []);

	//Al abrir, se mostrarán las citas pendientes (cuando es pendientes no se filtra, la coleccion tiene puras pendientes)
	useEffect(() => {
		const fechaFormateada = dayjs().format("YYYY-MM-DD");

		if (sessionDataStorage && open) {
			async function fetchData() {
				const citasPendientes = await getCitasPendientesByIdBarbero(sessionDataStorage._id);
				// setCitasPendientes(citasPendientes);

				const citasFiltradasFecha = citasPendientes.filter((cita) => cita.fecha_asignada == fechaFormateada);

				console.log("fechaFormateada", fechaFormateada);
				console.log("citasPendientes", citasPendientes);
				console.log("citasFiltradasFecha", citasFiltradasFecha);
				setCitasFiltradas(citasFiltradasFecha);

				///// Bloquear Fechas que no tienen cita en PENDIENTES
				const fechas = citasPendientes.map((cita) => cita.fecha_asignada);
				const fechasUnicas = [...new Set(fechas)];
				setFechasPermitidas(fechasUnicas);
				setIsLoadingApp(false);
			}
			fetchData();
		}
	}, [open, reload]);

	///// Bloquear Fechas que no tienen cita en COMPLETADAS o CANCELADAS
	// useEffect(() => {
	//   if (filtroCitas == "CANCELADA") {
	//   }
	//   if (filtroCitas == "COMPLETADA") {
	//   }
	//   const fechas = citasPendientes.map((cita) => cita.fecha_asignada);
	//   const fechasUnicas = [...new Set(fechas)];
	//   console.log(">>>>>>> fechasUnicas", fechasUnicas);
	//   setFechasPermitidas(fechasUnicas);
	// }, [filtroCitas]);

	//Al cambiar el filtro, dependiendo del filtro trae los datos de la BD y cambia las citas que se muestran
	useEffect(() => {
		const fechaFormateada = fechaSel.format("YYYY-MM-DD");
		console.log("Cambio el FILTRO:", filtroCitas);
		setIsLoadingApp(false);

		if (sessionDataStorage && open) {
			async function fetchData() {
				if (filtroCitas === "PENDIENTE") {
					const citasPendientesReload = await getCitasPendientesByIdBarbero(sessionDataStorage._id);

					const citasFiltradasFecha = citasPendientesReload.filter((cita) => cita.fecha_asignada == fechaFormateada);
					setCitasFiltradas(citasFiltradasFecha);
					///// Bloquear Fechas que no tienen cita en PENDIENTES
					const fechas = citasPendientesReload.map((cita) => cita.fecha_asignada);
					const fechasUnicas = [...new Set(fechas)];
					setFechasPermitidas(fechasUnicas);
					///// Bloquear Fechas que no tienen cita en PENDIENTES
				}
				if (filtroCitas === "COMPLETADA") {
					const citasCompletadas = await getCitasCompletadasByIdBarbero(sessionDataStorage._id);
					const citasCompletadasFiltradasByFecha = citasCompletadas.filter((cita) => cita.fecha_asignada == fechaFormateada);
					setCitasFiltradas(citasCompletadasFiltradasByFecha);
					///// Bloquear Fechas que no tienen cita en COMPLETADA
					const fechas = citasCompletadas.map((cita) => cita.fecha_asignada);
					const fechasUnicas = [...new Set(fechas)];
					setFechasPermitidas(fechasUnicas);
					///// Bloquear Fechas que no tienen cita en COMPLETADA
				}
				if (filtroCitas === "CANCELADA") {
					const citasCanceladas = await getCitasCanceladasByIdBarbero(sessionDataStorage._id);
					const citasCanceladasFiltradasByFecha = citasCanceladas.filter((cita) => cita.fecha_asignada == fechaFormateada);
					setCitasFiltradas(citasCanceladasFiltradasByFecha);
					///// Bloquear Fechas que no tienen cita en CANCELADA
					const fechas = citasCanceladas.map((cita) => cita.fecha_asignada);
					const fechasUnicas = [...new Set(fechas)];
					setFechasPermitidas(fechasUnicas);
					///// Bloquear Fechas que no tienen cita en CANCELADA
				}
			}

			fetchData();
		}
	}, [filtroCitas, fechaSel, reload]);

	//Cambiar de pendiente a cancelado/terminado
	const handleCancelarCita = async (cita) => {
		const nuevaCita = JSON.parse(JSON.stringify(cita));
		nuevaCita.estatus = "CANCELADA";
		await handleUpdateStatus(nuevaCita);
	};

	//Cambiar de pendiente a cancelado/terminado
	const handleCompletarCita = async (cita) => {
		const nuevaCita = JSON.parse(JSON.stringify(cita));
		nuevaCita.estatus = "COMPLETADA";
		await handleUpdateStatus(nuevaCita);
	};

	// UPDATE ACTION //
	// 1. Eliminar la cita, 2. Crear esa misma cita pero con estatus cambiado en citas_registro
	const handleUpdateStatus = async (cita) => {
		try {
			await deleteCita(cita._id);
			await postCitaregistro(cita);

			toast.success("Estatus de citamodificado.");
			handleReload();
		} catch (error) {
			console.error("Error al modificar:", error);
			toast.error("Error al modificar el estatus.");
		}
	};

	const handleReload = async () => {
		setReload((prev) => !prev);
		setIsLoadingApp(true);
	};

	//Formatear fecha de  AAAA-MM-DD a DD-MM-AAAA
	function formatearFecha(fechaString) {
		const fecha = new Date(fechaString);
		const dia = (fecha.getDate() + 1).toString().padStart(2, "0");
		const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 aquí
		const año = fecha.getFullYear();

		return `${dia}-${mes}-${año}`;
	}

	const disableDates = (date) => {
		const dateString = date.format("YYYY-MM-DD");
		return !fechasPermitidas.includes(dateString);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753 ", // Color de Fondo
					color: "black", // Color del Texto
				}}
			>
				<Stack direction={"row"} sx={{ my: -1, ml: -1 }}>
					<Avatar alt='Imagen de perfil' src={sessionDataStorage.imagenes[0]?.url} sx={{ height: 50, width: 50, mr: 1.5 }} />
					<Typography style={{ fontSize: "35px" }}>
						<strong>Mis citas</strong>
					</Typography>
					<IconButton onClick={handleReload} sx={{ backgroundColor: "#E2b753", width: 50, height: 50, m: "auto" }}>
						<CachedIcon sx={{ width: 40, height: 40 }} />
					</IconButton>
				</Stack>
			</DialogTitle>

			{isLoadingApp ? (
				<DialogContent dividers sx={{ backgroundColor: "#EEE" }}>
					<Stack
						direction={"row"}
						// sx={{ ml: { xs: -2.5 }, mt: { xs: -1.8, sm: -1.5 } }}
						sx={{ m: "auto", mb: 1 }}
					>
						<Paper sx={{ mb: 1 }}>
							<Select disabled value={filtroCitas} onChange={(e) => setFiltroCitas(e.target.value)} fullWidth defaultValue={"PENDIENTE"} sx={{ textAlign: "center", width: { xs: 100, sm: 170 } }}>
								<MenuItem value='COMPLETADA'>COMPLETADAS</MenuItem>
								<MenuItem value='CANCELADA'>CANCELADAS</MenuItem>
								<MenuItem value='PENDIENTE'>PENDIENTES</MenuItem>
							</Select>
						</Paper>
						<Paper sx={{ mb: 1, ml: 1 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
								<DesktopDatePicker disabled value={fechaSel} onChange={(newValue) => setFechaSel(newValue)} sx={{ width: 150 }} shouldDisableDate={disableDates} />
							</LocalizationProvider>
						</Paper>
					</Stack>
					<Stack
						spacing={1}
						sx={{
							mt: 2,
							textAlign: "center",
							alignItems: "center", // Para centrar horizontalmente
							justifyContent: "center", // Para centrar verticalmente si el Stack tiene una altura específica
						}}
					>
						<Skeleton variant='circular' width={80} height={80} />
						<br />
						<Skeleton variant='rectangular' width={300} height={30} />
						<Skeleton variant='rounded' width={300} height={30} />
						<Skeleton variant='rounded' width={300} height={30} />
						<Skeleton variant='rounded' width={300} height={30} />
						<Skeleton variant='rounded' width={300} height={30} />
						<Skeleton variant='rounded' width={300} height={30} />
						<br />
						<Skeleton variant='rounded' width={300} height={30} />
					</Stack>
				</DialogContent>
			) : (
				<DialogContent dividers sx={{ backgroundColor: "#EEE" }}>
					<Stack
						direction={"row"}
						// sx={{ ml: { xs: -2.5 }, mt: { xs: -1.8, sm: -1.5 } }}
						sx={{ m: "auto", mb: 1 }}
					>
						<Paper sx={{ mb: 1 }}>
							<Select value={filtroCitas} onChange={(e) => setFiltroCitas(e.target.value)} fullWidth defaultValue={"PENDIENTE"} sx={{ textAlign: "center", width: { xs: 100, sm: 170 } }}>
								<MenuItem value='COMPLETADA'>COMPLETADAS</MenuItem>
								<MenuItem value='CANCELADA'>CANCELADAS</MenuItem>
								<MenuItem value='PENDIENTE'>PENDIENTES</MenuItem>
							</Select>
						</Paper>
						<Paper sx={{ mb: 1, ml: 1 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
								<DesktopDatePicker value={fechaSel} onChange={(newValue) => setFechaSel(newValue)} sx={{ width: 150 }} shouldDisableDate={disableDates} />
							</LocalizationProvider>
						</Paper>
					</Stack>
					{citasFiltradas.length == 0 && (
						<Box sx={{ m: "auto", textAlign: "center" }}>
							<Typography variant='h5' gutterBottom sx={{ m: 2 }}>
								No tienes un registro de citas
							</Typography>
							<FolderOffIcon sx={{ width: 100, height: 100 }} />
						</Box>
					)}
					{citasFiltradas.map((cita) => (
						<Card
							sx={{
								margin: "auto",
								marginBottom: 1,
								paddingX: 2,
							}}
						>
							<CardContent>
								<Avatar
									src={"/images/icons/cliente.png"}
									alt='Imagen del Cliente'
									sx={{
										width: 80,
										height: 80,
										m: "auto",
										borderRadius: "10%",
										mb: 1,
									}}
								/>
								<Typography variant='h5' sx={{ textAlign: "center", mb: 1 }}>
									{cita.datos_cliente.nombre}
								</Typography>

								<Stack direction='row'>
									<BusinessIcon />
									<Typography variant='subtitle1' gutterBottom sx={{ ml: 1 }}>
										{cita.nombre_barberia_asignada}
									</Typography>
								</Stack>
								<Stack direction='row'>
									<ContentCutIcon />
									<Typography variant='subtitle1' gutterBottom sx={{ ml: 1 }}>
										{cita.nombre_servicio_asignado}
									</Typography>
								</Stack>
								<Stack direction='row'>
									<MonetizationOnIcon />
									<Typography variant='subtitle1' gutterBottom sx={{ ml: 1 }}>
										{cita.costo} pesos
									</Typography>
								</Stack>

								<Stack direction={"row"}>
									<EventIcon />
									<Typography variant='subtitle1' gutterBottom sx={{ ml: 1 }}>
										{formatearFecha(cita.fecha_asignada)}
									</Typography>
								</Stack>
								<Stack direction='row'>
									<AccessTimeIcon />
									<Typography variant='subtitle1' gutterBottom sx={{ ml: 1 }}>
										{cita.hora_inicio_asignada} a {cita.hora_fin_asignada}
									</Typography>
								</Stack>
							</CardContent>
							<Stack direction='row' sx={{ textAlign: "center" }}>
								{cita.estatus === "CANCELADA" && (
									<Typography variant='h6' sx={{ m: "auto", mb: 2 }}>
										<CancelIcon color='error' sx={{ width: 30, height: 30, mr: 1, mb: -1 }} />
										{cita.estatus}
									</Typography>
								)}
								{cita.estatus === "COMPLETADA" && (
									<Typography variant='h6' sx={{ m: "auto", mb: 2 }}>
										<CheckCircleOutlineIcon color='success' sx={{ width: 30, height: 30, mr: 1, mb: -1 }} />
										{cita.estatus}
									</Typography>
								)}

								{cita.estatus === "PENDIENTE" && (
									<Typography variant='h6' sx={{ m: "auto", mb: 2 }}>
										<WatchLaterIcon sx={{ width: 30, height: 30, mr: 1, mb: -1 }} />
										{cita.estatus}
									</Typography>
								)}
							</Stack>
							{cita.estatus == "PENDIENTE" && (
								<Stack direction='row' sx={{ mb: 2 }}>
									<Button onClick={() => handleCancelarCita(cita)} variant={"contained"} color='error' sx={{ mx: 0.5, minWidth: 90, py: 1 }}>
										Cancelar
									</Button>
									<Button onClick={() => handleCompletarCita(cita)} variant={"contained"} sx={{ mx: 0.5, py: 1 }} fullWidth>
										Completar
									</Button>
								</Stack>
							)}
						</Card>
					))}
				</DialogContent>
			)}

			<DialogActions>
				<Button onClick={handleClose} variant='outlined' fullWidth>
					<Typography color={"error"}>
						Cerrar
						{/* <CloseIcon sx={{ mb: -0.8 }} /> */}
					</Typography>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalMisCitasBarbero;

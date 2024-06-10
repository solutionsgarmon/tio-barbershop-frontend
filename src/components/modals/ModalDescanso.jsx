import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Avatar,
	Stack,
	Tabs,
	Tab,
	Box,
	AppBar,
	Chip,
	TextField,
	FormControlLabel,
	Switch,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import MySwitch from "../atoms/MySwitch";
import { postBarbershop, postCita } from "../../api/posts";
import { getBarber, getCitasCompletadasByIdBarbero, getCitasPendientesByIdBarbero } from "../../api/gets";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteCita, deleteCitaRegistro } from "../../api/deletes";
import Swal from "sweetalert2";
import { addToLocalStorage } from "../../helpers/localStorageHelper";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role='tabpanel' hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}
const getCurrentDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const getMaxDate = () => {
	return `2099-12-31`;
};
const ModalDescanso = ({ handleClose, open }) => {
	const { sessionDataStorage } = useAppContext();

	const [nombre, setNombre] = useState("");
	const [urlImagen, setUrlImagen] = useState("");
	const [value, setValue] = useState(0);
	const [isMultipleDays, setIsMultipleDays] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [descansos, setDescansos] = useState([]);
	const theme = useTheme();
	const [reload, setReload] = useState(false);

	const [isLoadingApp, setIsLoadingApp] = useState(false);

	useEffect(() => {
		if (sessionDataStorage) {
			setUrlImagen(sessionDataStorage.imagenes[0]?.url);
		}
	}, [sessionDataStorage]);

	// const handleStartDateChange = (event) => {
	// 	const value = event.target.value;
	// 	if (isValidDate(value)) {
	// 		setStartDate(value);
	// 		// Asegurarse de que la fecha fin sea al menos igual a la fecha inicio
	// 		if (value > endDate) {
	// 			setEndDate(value);
	// 		}
	// 	}
	// };

	useEffect(() => {
		async function fetchData() {
			const citasPendientes = await getCitasPendientesByIdBarbero(sessionDataStorage._id);
			const citasCompletadas = await getCitasCompletadasByIdBarbero(sessionDataStorage._id);
			const descansosPendientes = citasPendientes.filter((cita) => cita.tipo_cita == "DESCANSO");
			const descansosCompletados = citasCompletadas.filter((cita) => cita.tipo_cita == "DESCANSO");
			const allDescansos = [...descansosPendientes, ...descansosCompletados];
			console.log("allDescansos", allDescansos);
			setDescansos(allDescansos);
		}
		fetchData();
	}, [reload]);

	useEffect(() => {
		return () => {
			setNombre("");
			setValue(0);
			setIsMultipleDays(false);
			setStartDate("");
			setEndDate("");
			setStartTime("");
			setDescripcion("");
			setEndTime("");
		};
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleCrearDescanso = async () => {
		setIsLoadingApp(true);

		const selectedDate = new Date(startDate);
		const currentDate = new Date();
		const maxDate = new Date("2099-12-31");

		// Establecer horas, minutos, segundos y milisegundos a cero
		selectedDate.setHours(0, 0, 0, 0);
		currentDate.setHours(0, 0, 0, 0);
		maxDate.setHours(0, 0, 0, 0);

		const adjustedSelectedDate = new Date(selectedDate);
		adjustedSelectedDate.setDate(adjustedSelectedDate.getDate() + 1);

		if (adjustedSelectedDate < currentDate) {
			console.log("currentDate", currentDate);
			console.log("adjustedSelectedDate", adjustedSelectedDate);
			console.log("selectedDate", selectedDate);
			toast.error("La fecha de inicio debe ser igual o posterior a la fecha actual.");
			setIsLoadingApp(false);
			return;
		}

		if (selectedDate > maxDate) {
			toast.error("La fecha de inicio debe ser válida.");
			setIsLoadingApp(false);
			return;
		}

		// Validar fechas y horas
		if (!startDate) {
			toast.error("Debe seleccionar una fecha de inicio.");
			setIsLoadingApp(false);
			return;
		}

		if (isMultipleDays) {
			console.log("SON MULTIPLES");
			if (!endDate) {
				toast.error("Debe seleccionar una fecha de fin.");
				setIsLoadingApp(false);
				return;
			}
			if (new Date(startDate) > new Date(endDate)) {
				toast.error("La fecha de inicio debe ser anterior a la fecha de fin.");
				setIsLoadingApp(false);
				return;
			}
		} else {
			if (startTime >= endTime) {
				toast.error("La hora de inicio debe ser menor a la hora final.");
				setIsLoadingApp(false);
				return;
			}
		}
		if (!endTime) {
			toast.error("Debe seleccionar una hora de fin.");
			setIsLoadingApp(false);
			return;
		}

		if (!isMultipleDays && startDate === endDate && startTime >= endTime) {
			toast.error("La hora de inicio debe ser anterior a la hora de fin.");
			setIsLoadingApp(false);
			return;
		}

		try {
			const values = {
				tipo_cita: "DESCANSO",
				nombre_barbero_asignado: sessionDataStorage.nombre,
				barbero_asignado: sessionDataStorage._id,
				imagen_barbero_asignado: sessionDataStorage.imagenes[0]?.url,

				hora_inicio_asignada: startTime,
				hora_fin_asignada: endTime,
				fecha_asignada: startDate,
				fecha_asignada_fin: isMultipleDays ? endDate : startDate,

				estatus: "PENDIENTE",
				notas: descripcion,
				fecha_creacion: new Date(),
			};

			const resp = await postCita(values);
			console.log("resp", resp);
			toast.success("Descanso creado");

			//Actualizar sessionDataStorage

			setReload((prev) => !prev);

			setNombre("");
			setValue(0);
			setIsMultipleDays(false);
			setStartDate("");
			setEndDate("");
			setStartTime("");
			setDescripcion("");
			setEndTime("");
		} catch (e) {
			console.log("Error en handleCrearDescanso");
			toast.error("No se pudo crear descanso");
			setIsLoadingApp(false);
		}
		setIsLoadingApp(false);

		console.log("startDate", startDate);
		console.log("endDate", endDate);
		console.log("startTime", startTime);
		console.log("endTime", endTime);
	};

	const handleSwitchChange = (event) => {
		setIsMultipleDays(event.target.checked);
		if (!event.target.checked) {
			setEndDate(""); // Clear end date when switching to single day
		}
	};

	const handleStartDateChange = (e) => {
		const newStartDate = e.target.value;
		const selectedDate = new Date(newStartDate);
		const currentDate = new Date();
		const maxDate = new Date("2099-12-31");

		if (selectedDate > maxDate) {
			toast.error("Ingresa una fecha válida menor que 31/12/2099.");
			setStartDate("");
			return;
		}

		if (isMultipleDays && endDate && selectedDate >= new Date(endDate)) {
			toast.error("La fecha de inicio debe ser anterior a la fecha de fin.");
			setEndDate("");
			return;
		}

		setStartDate(newStartDate);
	};

	const handleEndDateChange = (e) => {
		const newEndDate = e.target.value;
		const year = parseInt(newEndDate.split("-")[0], 10);

		if (startDate && new Date(startDate) >= new Date(e.target.value)) {
			toast.error("La fecha de fin debe ser posterior a la fecha de inicio.");
		} else if (year > 2099) {
			setEndDate("");
			toast.error("Ingresa un año válido.");
			return;
		} else {
			setEndDate(e.target.value);
		}
	};

	const handleBorrarDescanso = async (descanso) => {
		try {
			let resp;
			if (descanso.estatus == "PENDIENTE") {
				resp = await deleteCita(descanso._id);
			} else {
				resp = await deleteCitaRegistro(descanso._id);
			}

			if (resp.data.success) toast.success("Se eliminó correctamente.");
			else toast.error("No se pudo eliminar.");

			setReload((prev) => !prev);
		} catch (e) {
			console.log("error en handleborrarDescanso");
			toast.error("No se pudo eliminar correctamente");
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753", // Color de Fondo
					color: "black", // Color del Texto
				}}
			>
				<Typography variant='h6'>Descansar</Typography>
			</DialogTitle>
			<DialogContent sx={{ textAlign: "center" }}>
				<AppBar sx={{ mt: 0 }} position='static' color='default'>
					<Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='inherit' variant='fullWidth' aria-label='full width tabs example'>
						<Tab label='Descanso' {...a11yProps(0)} />
						<Tab label='Programar descanso' {...a11yProps(1)} />
						<Tab label='Mis descansos' {...a11yProps(2)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Stack sx={{ mb: -1, mt: 1 }}>
						<MySwitch />
					</Stack>
					{sessionDataStorage?.descanso === "NO" && <Avatar alt={nombre} src={urlImagen} sx={{ m: "auto", height: 150, width: 150, my: 2 }} />}
					{sessionDataStorage?.descanso === "SI" && <Avatar alt={nombre} src={"/images/descanso.webp"} sx={{ m: "auto", height: 150, width: 150, my: 2 }} />}

					{sessionDataStorage?.descanso === "SI" ? (
						<Chip sx={{ mx: "auto", backgroundColor: "#E2b753" }} label='Actualmente está Descansanso' />
					) : (
						<Chip sx={{ mx: "auto" }} color='success' label='Actualmente está Activo' />
					)}
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Box sx={{ textAlign: "center" }}>
						{/* <Typography variant='body1'>Seleccionar fecha y horario para el descanso:</Typography> */}
						<FormControlLabel disabled={isLoadingApp} control={<Switch checked={isMultipleDays} onChange={handleSwitchChange} />} label='Más de un día' sx={{ mb: 1 }} />
						<TextField
							disabled={isLoadingApp}
							label='Fecha inicio'
							type='date'
							value={startDate}
							onChange={handleStartDateChange}
							fullWidth
							InputLabelProps={{ shrink: true }}
							inputProps={{ min: getCurrentDate() }} // Aquí estableces la fecha mínima
							sx={{ mt: 1 }}
						/>
						{isMultipleDays && (
							<TextField
								disabled={isLoadingApp}
								label='Fecha fin'
								type='date'
								value={endDate}
								onChange={handleEndDateChange}
								fullWidth
								InputLabelProps={{ shrink: true }}
								inputProps={{ min: startDate || getCurrentDate() }} // Aquí estableces la fecha mínima
								sx={{ mt: 1 }}
							/>
						)}
						<TextField
							disabled={isLoadingApp}
							label='Hora inicio'
							type='time'
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
							fullWidth
							InputLabelProps={{ shrink: true }}
							sx={{ mt: 1 }}
						/>
						<TextField disabled={isLoadingApp} label='Hora fin' type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 1 }} />
						<TextField
							disabled={isLoadingApp}
							multiline
							rows={3}
							label='Descripcion'
							value={descripcion}
							onChange={(e) => setDescripcion(e.target.value)}
							fullWidth
							InputLabelProps={{ shrink: true }}
							sx={{ mt: 1 }}
						/>
						<Button disabled={isLoadingApp} fullWidth variant='contained' sx={{ py: 1, mt: 1 }} onClick={handleCrearDescanso}>
							Crear Descanso
						</Button>
					</Box>
					{/* /// #3ra Vista//// */}
				</TabPanel>

				<TabPanel value={value} index={2} dir={theme.direction}>
					{" "}
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='citas table'>
							<TableHead>
								<TableRow>
									<TableCell>
										<strong>ACCIONES</strong>
									</TableCell>
									<TableCell>
										<strong>IMAGEN</strong>
									</TableCell>

									<TableCell>
										<strong>ESTATUS</strong>
									</TableCell>
									<TableCell>
										<strong>INICIA</strong>
									</TableCell>
									<TableCell>
										<strong>TERMINA</strong>
									</TableCell>

									<TableCell>
										<strong>DESCRIPCIÓN</strong>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{descansos.map((descanso) => (
									<TableRow key={descanso.barbero_asignado}>
										<TableCell>
											<Stack direction={"row"}>
												{/* <IconButton sx={{ mx: -0.5 }} aria-label='modificar'>
													<EditIcon style={{ color: "#E2b753" }} /> 
												</IconButton> */}
												<IconButton onClick={() => handleBorrarDescanso(descanso)} sx={{ m: "auto" }} aria-label='borrar'>
													<DeleteIcon sx={{ width: 25, height: 25 }} style={{ color: "#f44336" }} /> {/* Puedes personalizar el color */}
												</IconButton>
											</Stack>
										</TableCell>
										<TableCell>
											<Avatar src={descanso.imagen_barbero_asignado} alt={descanso.nombre_barbero_asignado} />
										</TableCell>
										<TableCell>{descanso.estatus}</TableCell>
										<TableCell>
											{descanso.hora_inicio_asignada}
											{" - "} {descanso.fecha_asignada}
										</TableCell>
										<TableCell>
											{descanso.hora_fin_asignada} {" - "}
											{descanso.fecha_asignada_fin}
										</TableCell>
										<TableCell>{descanso.notas}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</TabPanel>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' onClick={handleClose}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalDescanso;

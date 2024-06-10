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
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import MySwitch from "../atoms/MySwitch";
import { postBarbershop, postCita } from "../../api/posts";
import { getCitasCompletadasByIdBarbero, getCitasPendientesByIdBarbero } from "../../api/gets";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteCita, deleteCitaRegistro } from "../../api/deletes";
import Swal from "sweetalert2";

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

const ModalCrearDescansoAdmin = ({ handleClose, open, setReload }) => {
	const { sessionDataStorage, barbers } = useAppContext();

	const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
	const [isMultipleDays, setIsMultipleDays] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const [isLoadingApp, setIsLoadingApp] = useState(false);

	useEffect(() => {
		return () => {
			setBarberoSeleccionado(null);
			setIsMultipleDays(false);
			setStartDate("");
			setEndDate("");
			setStartTime("");
			setDescripcion("");
			setEndTime("");
		};
	}, []);

	const handleCrearDescanso = async () => {
		setIsLoadingApp(true);

		const selectedDate = new Date(startDate);
		const currentDate = new Date();
		const currentHour = new Date().getHours();
		const currentMinute = new Date().getMinutes();
		const maxDate = new Date("2099-12-31");

		// Establecer horas, minutos, segundos y milisegundos a cero
		selectedDate.setHours(0, 0, 0, 0);
		currentDate.setHours(0, 0, 0, 0);
		maxDate.setHours(0, 0, 0, 0);

		const adjustedSelectedDate = new Date(selectedDate);
		adjustedSelectedDate.setDate(adjustedSelectedDate.getDate() + 1);

		if (adjustedSelectedDate.getTime() === currentDate.getTime()) {
			const [endHour, endMinute] = endTime.split(":").map(Number);

			if (endHour < currentHour || (endHour === currentHour && endMinute < currentMinute)) {
				setIsLoadingApp(false);
				if (
					currentMinute == 1 ||
					currentMinute == 2 ||
					currentMinute == 3 ||
					currentMinute == 4 ||
					currentMinute == 5 ||
					currentMinute == 6 ||
					currentMinute == 7 ||
					currentMinute == 8 ||
					currentMinute == 9
				)
					toast.error("La hora final no puede ser anterior a la hora actual (" + currentHour + ":0" + currentMinute + ")");
				else toast.error("La hora final no puede ser anterior a la hora actual (" + currentHour + ":" + currentMinute + ")");
				return;
			}
		}

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
				nombre_barbero_asignado: barberoSeleccionado.nombre,
				barbero_asignado: barberoSeleccionado._id,
				imagen_barbero_asignado: barberoSeleccionado.imagenes[0].url,
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
			setReload((prev) => !prev);
			setBarberoSeleccionado(null);
			setIsMultipleDays(false);
			setStartDate("");
			setEndDate("");
			setStartTime("");
			setDescripcion("");
			setEndTime("");

			handleClose();
		} catch (e) {
			console.log("Error en handleCrearDescanso");
			toast.error("No se pudo crear descanso, verifique los datos ingresados");
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

		// if (selectedDate < currentDate) {
		// 	toast.error("La fecha de inicio debe ser posterior a la fecha actual.");
		// 	setStartDate("");
		// 	return;
		// }

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

	useEffect(() => {
		console.log("barberoSeleccionado", barberoSeleccionado);
	}, [barberoSeleccionado]);

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

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753", // Color de Fondo
					color: "black", // Color del Texto
				}}
			>
				<Typography variant='h6'>Crear un descanso</Typography>
			</DialogTitle>
			<DialogContent sx={{ textAlign: "center" }}>
				<Box sx={{ textAlign: "center" }}>
					<Stack direction={"row"}>
						<FormControlLabel sx={{ width: 250 }} disabled={isLoadingApp} control={<Switch checked={isMultipleDays} onChange={handleSwitchChange} />} label='Más de un día' />
						<FormControl fullWidth sx={{ mt: 1 }}>
							<InputLabel>Barbero</InputLabel>
							<Select value={barberoSeleccionado?.nombre} fullWidth label='Barbero' sx={{ textAlign: "center" }}>
								{barbers.map((barber) => (
									<MenuItem key={barber._id} value={barber._id} onClick={() => setBarberoSeleccionado(barber)}>
										{barber.nombre}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					<Stack direction={"row"}>
						{" "}
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
								sx={{ mt: 1, ml: 1 }}
							/>
						)}
					</Stack>
					<Stack direction={"row"}>
						<TextField
							disabled={isLoadingApp}
							label='Hora inicio'
							type='time'
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
							fullWidth
							InputLabelProps={{ shrink: true }}
							sx={{ mt: 1, mr: 1 }}
						/>
						<TextField disabled={isLoadingApp} label='Hora fin' type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 1 }} />
					</Stack>
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
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' onClick={handleClose}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalCrearDescansoAdmin;

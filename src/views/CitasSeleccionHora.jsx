import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Select, MenuItem, Box, Stack, Paper } from "@mui/material";
import { getHorarioDisponibleBarber } from "../api/gets";
import { useAppContext } from "../context/AppProvider";
import CalendarSeleccionCita from "../components/atoms/CalendarSeleccionCita";
import CircularProgress from "@mui/material/CircularProgress";
import { scrollToTop } from "../utils/screen";
import { scrollToBottom } from "../utils/screen";

const fechaHoy = dayjs().format("YYYY-MM-DD").toUpperCase();

const CitasSeleccionHora = ({ setEnableButton, dataCita, setDataCita }) => {
	const { setIsLoadingApp } = useAppContext();
	const [horaSeleccionada, setHoraSeleccionada] = useState("");
	const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaHoy);
	const [horasDisponibles, setHorasDisponibles] = useState([]);
	const [totalHorasDisponibles, setTotalHorasDisponibles] = useState(null);

	const containerRef = useRef(null); // Referencia al contenedor del componente

	useEffect(() => {
		scrollToTop();
	}, []);

	// Obtener todo el horario disponible de los próximos 15 días y las horas disponibles de HOY
	useEffect(() => {
		console.log("useEffect []");

		handleChangeCalendar(fechaSeleccionada);

		async function fetchData() {
			const horario_disponible_15_dias = await getHorarioDisponibleBarber(dataCita.id_barbero, dataCita.id_servicio, dataCita.id_barberia);

			const horario_disponible_hoy = horario_disponible_15_dias[dayjs().format("YYYY-MM-DD").toUpperCase()];
			setHorasDisponibles(horario_disponible_hoy);
			setTotalHorasDisponibles(horario_disponible_15_dias);
			//setIsLoadingApp(false);
		}
		//setIsLoadingApp(true);
		fetchData();
	}, []);

	//Este useEffect es el que cambia la data del Select dependiendo de la fecha
	useEffect(() => {
		console.log("useEffect fechaSeleccionada", fechaSeleccionada);
		if (totalHorasDisponibles) {
			const horario_disponible_hoy = totalHorasDisponibles[fechaSeleccionada];
			setHorasDisponibles(horario_disponible_hoy);
		}

		//scrollToBottom();
	}, [fechaSeleccionada]);

	// Función para manejar el cambio de hora seleccionada
	const handleChangeHora = (event) => {
		//scrollToBottom();

		const rangoHora = event.target.value;

		setHoraSeleccionada(rangoHora);
		setDataCita((prevDataCita) => ({
			...prevDataCita,
			hora: rangoHora,
		}));
		setEnableButton(true);
	};

	const handleChangeCalendar = (dateSelected) => {
		console.log("[ejecución] handleChangeCalendar()");
		setHoraSeleccionada("");
		setFechaSeleccionada(dateSelected);
		setDataCita((prevDataCita) => ({
			...prevDataCita,
			fecha: dateSelected,
		}));
	};

	// Función para sumar la duración del corte de cabello a la hora seleccionada
	const sumarDuracion = (hora, duracion) => {
		const [horaStr, minutoStr] = hora.split(":");
		const horaObj = dayjs().hour(Number(horaStr)).minute(Number(minutoStr));
		const horaFinalObj = horaObj.add(duracion, "minute");
		return horaFinalObj.format("HH:mm");
	};

	return (
		<div
			ref={containerRef}
			style={{
				display: "flex",
				justifyContent: "center", // Centrado horizontal
				alignItems: "center", // Centrado vertical
			}}
		>
			<Stack direction={"column"}>
				<CalendarSeleccionCita handleChangeCalendar={handleChangeCalendar} />

				<Paper sx={{ mt: 1 }}>
					<Select value={horaSeleccionada} onChange={handleChangeHora} displayEmpty fullWidth>
						<MenuItem value='' disabled>
							{horasDisponibles?.length == 0 ? "DESCANSO DEL BARBERO" : "SELECCIONA UN HORARIO"}
						</MenuItem>

						{horasDisponibles?.map((hora, index) => (
							<MenuItem
								key={index}
								value={hora}
								//TODO: AQUI ES EL PROBLEMA
								disabled={fechaHoy === fechaSeleccionada && hora < dayjs().format("HH:mm")}
							>
								{/* {console.log("hora", hora)}
                {console.log("dayjs().format", dayjs().format("HH:mm"))} */}
								{`${hora} - ${sumarDuracion(hora, dataCita.duracion)}`}
							</MenuItem>
						))}
					</Select>
				</Paper>
			</Stack>
		</div>
	);
};

export default CitasSeleccionHora;

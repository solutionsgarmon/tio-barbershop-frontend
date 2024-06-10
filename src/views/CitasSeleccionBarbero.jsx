import { Box } from "@mui/material";
import React, { useState } from "react";
import CardServices from "../components/cards/CardServices";
import { useEffect } from "react";
import CardCitaBarber from "../components/cards/CardCitaBarber";
import { scrollToTop } from "../utils/screen";
import { toast } from "react-toastify";
import CardCitaBarberDescansando from "../components/cards/CardCitaBarberDescansando";

const CitasSeleccionBarbero = ({ setEnableButton, setDataCita, dataCita, barbers }) => {
	const [selected, setSelected] = useState(null);
	const [barberosLocal, setBarberosLocal] = useState([]);

	useEffect(() => {
		scrollToTop();
	}, []);

	useEffect(() => {
		if (barbers && barbers.length > 0) {
			console.log("barbers", barbers);
			const barberosFiltrados = barbers.filter((barbero) => barbero.barberias_asignadas.some((barberia) => barberia.idBarberia === dataCita.id_barberia));
			console.log("barberosFiltrados", barberosFiltrados);
			//	const barberosDisponibles = barberosFiltrados.filter((barbero) => barbero.descanso === "NO");
			//console.log("barberosDisponibles", barberosFiltrados);

			setBarberosLocal(barberosFiltrados);
		}
	}, [barbers, dataCita.id_barberia]);

	const handleSelectCard = (barbero) => {
		setDataCita((prevDataCita) => ({
			...prevDataCita,
			barbero: barbero.nombre,
			id_barbero: barbero._id,
			imagen_barbero: barbero.imagenes[0]?.url,
		}));
		setEnableButton(true);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
			}}
		>
			{barberosLocal?.map((barbero, index) => (
				<Box sx={{ m: { xs: 0.3, sm: 1 } }}>
					{barbero.descanso === "SI" ? (
						<CardCitaBarberDescansando barbero={barbero} onSelect={() => toast.warning("El barbero está inactivo, intente más tarde o seleccione otro barbero.")} dataCita={dataCita} />
					) : (
						<CardCitaBarber barbero={barbero} onSelect={handleSelectCard} dataCita={dataCita} />
					)}
				</Box>
			))}
		</Box>
	);
};

export default CitasSeleccionBarbero;

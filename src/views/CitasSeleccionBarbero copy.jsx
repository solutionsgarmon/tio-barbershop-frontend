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
				mx: 0,
				px: 0,
			}}
		>
			{barberosLocal?.map(
				(barbero, index) =>
					index % 2 === 0 && (
						<React.Fragment key={barbero.id}>
							<Box sx={{ m: { xs: 0.5, sm: 1 }, maxWidth: 350 }}>
								{barbero.descanso === "SI" ? (
									<>
										<CardCitaBarberDescansando
											barbero={barbero}
											onSelect={() => toast.warning("El barbero está descansando, intente en de nuevo en un rato más o seleccione otro")}
											dataCita={dataCita}
										/>
									</>
								) : (
									<CardCitaBarber barbero={barbero} onSelect={handleSelectCard} dataCita={dataCita} />
								)}
							</Box>
							{index + 1 < barberosLocal.length && (
								<Box sx={{ m: { xs: 0.5, sm: 1 }, maxWidth: 350 }}>
									{barbero.descanso === "SI" ? (
										<CardCitaBarberDescansando
											barbero={barberosLocal[index + 1]}
											onSelect={() => toast.warning("El barbero está descansando, intente en de nuevo en un rato más o seleccione otro")}
											dataCita={dataCita}
										/>
									) : (
										<CardCitaBarber barbero={barberosLocal[index + 1]} onSelect={handleSelectCard} dataCita={dataCita} />
									)}
								</Box>
							)}
						</React.Fragment>
					)
			)}
		</Box>
	);
};

export default CitasSeleccionBarbero;

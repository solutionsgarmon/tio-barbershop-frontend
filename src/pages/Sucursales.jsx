import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import MyMap from "../components/molecules/MyMap";
import ElementListWithImage from "../components/molecules/ElementListWithImage";
import { useAppContext } from "../context/AppProvider";
import CustomSwalModal from "../components/modals/CustomSwalModal";

const Sucursales = () => {
	const { barbershops, setIsLoadingApp } = useAppContext();
	const [sucursalSelected, setSucursalSelected] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		setIsLoadingApp(false);
	}, []);

	const handleCerrarModal = () => {
		console.log("handleCerrarModal");
		setOpenModal(false);
	};

	const handleVerHorario = () => {
		console.log("handleVerHorario");
		setOpenModal(true);
	};

	return (
		<Grid container spacing={0} sx={{ mt: { xs: 3, sm: 1.5 }, px: 5 }}>
			<Grid item xs={12} md={4}>
				<h2 style={{ textAlign: "center", color: "#FFF", margin: "20px" }}>SUCURSALES</h2>
				<Box
					sx={{
						maxHeight: { xs: "28vh", sm: "80vh" },
						overflowY: "auto",
						mt: -2,
					}}
				>
					{barbershops.map((barbershop, index) => (
						<Box sx={{ m: 1, borderRadius: 2 }} key={index} border={1} borderColor='#E2b753'>
							<ElementListWithImage
								setSucursalSelected={setSucursalSelected}
								image={barbershop?.imagenes[0]?.url}
								primaryText={barbershop.nombre}
								secondaryText={`${barbershop.direccion.calle},${barbershop.direccion.colonia} ${barbershop.direccion.ciudad}`}
								index={index}
								handleVerHorario={handleVerHorario}
							/>
						</Box>
					))}
				</Box>
			</Grid>
			<Grid item xs={12} md={8} sx={{ mt: { xs: 0, sm: 2 } }}>
				<Box border={1} borderColor='#E2b753' sx={{ height: { xs: "50vh", sm: "80vh" }, mt: 1, m: 1 }}>
					<MyMap lat={parseFloat(barbershops[sucursalSelected]?.coordenadas.latitud)} lng={parseFloat(barbershops[sucursalSelected]?.coordenadas.longitud)} height='100%' width='100%' />
				</Box>
			</Grid>
			<CustomSwalModal horario={barbershops[sucursalSelected]?.horario || {}} handleCerrarModal={handleCerrarModal} openModal={openModal} />
		</Grid>
	);
};

export default Sucursales;

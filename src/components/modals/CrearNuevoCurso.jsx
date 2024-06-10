import React, { useEffect, useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import { postCurso } from "../../api/posts";
import { updateCurso } from "../../api/updates";

const CrearNuevoCurso = ({ open, handleClose, curso, isUpdate }) => {
	const { isLoadingApp, setIsLoadingApp, barbers, barbershops } = useAppContext();

	const [cursoData, setCursoData] = useState({
		nombre: "",
		descripcion: "",
		fecha_inicio: "",
		fecha_fin: "",
		costo: "",
		barbero: null,
		barberia: null,
		isOnlyImage: false,
	});

	useEffect(() => {
		console.log("cursoData", cursoData);
	}, [cursoData]);

	useEffect(() => {
		if (curso) {
			setCursoData({
				nombre: curso.nombre,
				descripcion: curso.descripcion,
				fecha_inicio: curso.fecha_inicio,
				fecha_fin: curso.fecha_fin,
				costo: curso.costo,
				barbero: curso.barbero,
				barberia: curso.barberia,
				isOnlyImage: curso.isOnlyImage,
			});
		}
		if (!isUpdate) {
			setCursoData({ nombre: "", descripcion: "", fecha_inicio: "", fecha_fin: "", costo: "", barbero: null, barberia: null, isOnlyImage: false });
		}
		return () => {
			setCursoData({
				nombre: "",
				descripcion: "",
				fecha_inicio: "",
				fecha_fin: "",
				costo: "",
				barbero: null,
				barberia: null,
				isOnlyImage: false,
			});
		};
	}, [curso, isUpdate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCursoData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectChange = (e) => {
		const { name, value } = e.target;
		setCursoData((prevData) => ({
			...prevData,
			[name]: value === "true", // Convertir la cadena 'true' o 'false' en booleano
		}));
	};

	const handleBarberoChange = (e) => {
		const selectedBarbero = barbers.find((barber) => barber._id === e.target.value);
		setCursoData((prevData) => ({
			...prevData,
			barbero: selectedBarbero,
		}));
	};

	const handleBarbershopChange = (e) => {
		const selectedBarbershop = barbershops.find((barberia) => barberia._id === e.target.value);
		setCursoData((prevData) => ({
			...prevData,
			barberia: selectedBarbershop,
		}));
	};

	const validateCreateForm = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set the time to midnight to compare only the date part

		const startDate = new Date(cursoData.fecha_inicio);
		const endDate = new Date(cursoData.fecha_fin);

		if (startDate < today) {
			toast.error("La fecha de inicio debe ser hoy o en el futuro.");
			return false;
		}

		if (endDate < startDate) {
			toast.error("La fecha de fin debe ser igual o mayor que la fecha de inicio.");
			return false;
		}

		if (!cursoData.isOnlyImage && cursoData.nombre == "") {
			toast.error("El curso debe contener un Título");
			return false;
		}

		return true;
	};

	const handleSave = async () => {
		setIsLoadingApp(true);
		try {
			if (!validateCreateForm()) return;

			if (isUpdate) {
				await updateCurso(cursoData, curso._id);
			} else {
				await postCurso(cursoData);
			}

			console.log("Datos del curso guardados:", cursoData);

			handleClose();
		} catch (e) {
			console.log("Error en handleSave", e);
		}
		setIsLoadingApp(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753", // Color de Fondo
					color: "white", // Color del Texto
				}}
			>
				<Typography style={{ fontSize: "25px" }}>
					<strong>Nuevo Curso</strong>
				</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<FormControl fullWidth margin='normal'>
					<InputLabel id='isOnlyImage-label'>¿Es un Banner?</InputLabel>
					<Select labelId='isOnlyImage-label' id='isOnlyImage-select' name='isOnlyImage' value={cursoData.isOnlyImage.toString()} onChange={handleSelectChange}>
						<MenuItem value='false'>No</MenuItem>
						<MenuItem value='true'>Sí</MenuItem>
					</Select>
				</FormControl>
				<TextField disabled={cursoData.isOnlyImage} name='nombre' label='Nombre (Título)' value={cursoData.nombre} onChange={handleChange} fullWidth margin='normal' />
				<TextField disabled={cursoData.isOnlyImage} name='descripcion' label='Descripción' value={cursoData.descripcion} onChange={handleChange} fullWidth multiline rows={4} margin='normal' />
				<TextField
					disabled={cursoData.isOnlyImage}
					name='fecha_inicio'
					label='Fecha de Inicio'
					type='date'
					value={cursoData.fecha_inicio}
					onChange={handleChange}
					fullWidth
					margin='normal'
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					disabled={cursoData.isOnlyImage}
					name='fecha_fin'
					label='Fecha de Fin'
					type='date'
					value={cursoData.fecha_fin}
					onChange={handleChange}
					fullWidth
					margin='normal'
					InputLabelProps={{ shrink: true }}
				/>
				<TextField disabled={cursoData.isOnlyImage} name='costo' label='Costo' type='number' value={cursoData.costo} onChange={handleChange} fullWidth margin='normal' />
				<FormControl fullWidth margin='normal'>
					<InputLabel id='barbero-label'>Barbero</InputLabel>
					<Select disabled={cursoData.isOnlyImage} labelId='barbero-label' id='barbero-select' name='barbero' value={cursoData.barbero ? cursoData.barbero._id : ""} onChange={handleBarberoChange}>
						{barbers.map((barber) => (
							<MenuItem key={barber._id} value={barber._id}>
								{barber.nombre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth margin='normal'>
					<InputLabel id='barberia-label'>Barbería</InputLabel>
					<Select
						disabled={cursoData.isOnlyImage}
						labelId='barberia-label'
						id='barberia-select'
						name='barberia'
						value={cursoData.barberia ? cursoData.barberia._id : ""}
						onChange={handleBarbershopChange}
					>
						{barbershops.map((barberia) => (
							<MenuItem key={barberia._id} value={barberia._id}>
								{barberia.nombre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={handleSave} color='primary' variant='contained'>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CrearNuevoCurso;

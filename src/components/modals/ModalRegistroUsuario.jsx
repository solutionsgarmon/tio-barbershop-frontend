import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from "@mui/material";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import { postUser } from "../../api/posts";

const ModalRegistroUsuario = ({ open, handleClose }) => {
	const [nombreCompleto, setNombreCompleto] = useState("");
	const [correoElectronico, setCorreoElectronico] = useState("");
	const [contrasena, setContrasena] = useState("");
	const [telefono, setTelefono] = useState("");
	const [confirmarContrasena, setConfirmarContrasena] = useState("");
	const { setIsLoadingApp } = useAppContext();

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePhone = (phone) => {
		const re = /^\d{10}$/;
		return re.test(phone);
	};

	const validateName = (name) => {
		const re = /^[a-zA-Z\s]+$/;
		return re.test(name);
	};

	const handleSave = async () => {
		if (nombreCompleto === "" || contrasena === "" || telefono === "" || correoElectronico === "") {
			toast.warning("Complete los datos obligatorios.");
			return;
		}

		if (!validateName(nombreCompleto)) {
			toast.warning("El nombre completo solo puede contener letras y espacios.");
			return;
		}

		if (!validateEmail(correoElectronico)) {
			toast.warning("Por favor, ingrese un correo electrónico válido.");
			return;
		}

		if (!validatePhone(telefono)) {
			toast.warning("El número telefónico debe tener 10 dígitos.");
			return;
		}

		if (contrasena !== confirmarContrasena) {
			toast.warning("Las contraseñas no coinciden.");
			return;
		}

		setIsLoadingApp(true);
		const userData = {
			nombre: nombreCompleto,
			correo: correoElectronico,
			password: contrasena,
			telefono: telefono,
		};

		try {
			const resp = await postUser(userData);
			if (resp.data.success) {
				toast.success("Usuario creado, Ahora puedes iniciar sesión");
				handleClose();
				setNombreCompleto("");
				setCorreoElectronico("");
				setContrasena("");
				setConfirmarContrasena("");
			} else {
				toast.error("No se pudo registrar el usuario.");
			}
		} catch (error) {
			console.error("Error al Registrarse:", error);
			toast.error("Error al registrarse, intenta con otro correo.");
		}
		setIsLoadingApp(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753",
					color: "white",
				}}
			>
				<Typography style={{ fontSize: "25px" }}>
					<strong>Regístrate</strong>
				</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<TextField label='Nombre Completo*' value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} fullWidth sx={{ mb: 1 }} />
				<TextField label='Correo electrónico*' value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} fullWidth sx={{ mb: 1 }} />
				<TextField label='Teléfono (10 dígitos)*' value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth sx={{ mb: 1 }} />
				<Stack direction={"row"}>
					<TextField label='Contraseña*' type='password' value={contrasena} onChange={(e) => setContrasena(e.target.value)} fullWidth sx={{ mr: 1 }} />

					<TextField label='Confirmar Contraseña*' type='password' value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} fullWidth />
				</Stack>
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

export default ModalRegistroUsuario;

import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, IconButton, InputAdornment, Stack, Avatar, FormControlLabel, Switch } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppContext } from "../../context/AppProvider";
import { updateUser } from "../../api/updates";
import { toast } from "react-toastify";
import { addToLocalStorage } from "../../helpers/localStorageHelper";

const ModalMiPerfil = ({ handleClose, open }) => {
	const { setIsLoadingApp, sessionDataStorage } = useAppContext();
	const [nombre, setNombre] = useState("");
	const [correo, setCorreo] = useState("");
	const [telefono, setTelefono] = useState("");
	const [password, setPassword] = useState("");
	const [confirmarPassword, setConfirmarPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [urlImagen, setUrlImagen] = useState("");
	const [errorTexfield, setErrorTexfield] = useState({
		nombre: false,
		correo: false,
		telefono: false,
		password: false,
	});
	const [changePassword, setChangePassword] = useState(false);

	const handleSave = async () => {
		const idUser = sessionDataStorage._id;
		let values = {
			nombre,
			correo,
			telefono,
		};
		if (nombre == "") {
			setErrorTexfield({
				...errorTexfield,
				nombre: true,
			});
			toast.error("El nombre es obligatrorio");
			return;
		}
		if (telefono == "") {
			setErrorTexfield({
				...errorTexfield,
				telefono: true,
			});
			toast.error("El telefono es obligatrorio");
			return;
		}

		if (telefono.length !== 10) {
			setErrorTexfield({
				...errorTexfield,
				telefono: true,
			});
			toast.error("Ingresa el teléfono a 10 dígitos");
			return;
		}
		if (!changePassword) {
			const resp = await updateUser(values, idUser);

			if (resp.data.success) {
				addToLocalStorage("session", resp.data.data);
				console.log(" resp.data.data", resp.data.data);
				toast.success("Datos Actualizados");
			} else toast.error("No se pudo Actualizar los datos.");
		} else {
			if (password == "") {
				toast.warning("Debe ingresar una contraseña");
				return;
			}
			if (password == confirmarPassword) {
				values.password = password;
				console.log("values", values);
				const resp = await updateUser(values, idUser);

				if (resp.data.success) {
					addToLocalStorage("session", resp.data.data);
					console.log("resp.data.data", resp.data);
					toast.success("Datos Actualizados");
				} else {
					toast.error("No se pudo Actualizar los datos.");
				}
			} else {
				setErrorTexfield({
					...errorTexfield,
					password: true,
				});
				toast.error("Las contraseñas no coinciden.");
				return;
			}
		}

		handleClose();
	};

	useEffect(() => {
		if (sessionDataStorage) {
			setNombre(sessionDataStorage.nombre);
			setCorreo(sessionDataStorage.correo);
			setTelefono(sessionDataStorage.telefono);
			setUrlImagen(sessionDataStorage.imagenes[0]?.url);
		}
	}, [sessionDataStorage]);

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{
					backgroundColor: "#E2b753 ", // Color de Fondo
					color: "black", // Color del Texto
				}}
			>
				<Typography variant='h6'>Mi Perfil</Typography>
			</DialogTitle>
			<DialogContent>
				<Avatar alt={nombre} src={urlImagen} sx={{ m: "auto", height: 120, width: 120, my: 2 }} />
				<form>
					<TextField
						error={errorTexfield.correo}
						label='Correo electrónico'
						variant='outlined'
						fullWidth
						disabled
						value={correo}
						onChange={(e) => {
							setErrorTexfield({
								...errorTexfield,
								correo: false,
							});
							setCorreo(e.target.value);
						}}
						sx={{ pb: 1 }}
					/>
					<TextField
						error={errorTexfield.nombre}
						label='Nombre'
						variant='outlined'
						fullWidth
						value={nombre}
						onChange={(e) => {
							setErrorTexfield({
								...errorTexfield,
								nombre: false,
							});
							setNombre(e.target.value);
						}}
						sx={{ pb: 1 }}
					/>

					<TextField
						error={errorTexfield.telefono}
						type='number'
						label='Teléfono'
						variant='outlined'
						fullWidth
						value={telefono}
						onChange={(e) => {
							setErrorTexfield({
								...errorTexfield,
								telefono: false,
							});
							setTelefono(e.target.value);
						}}
						sx={{ pb: 1 }}
					/>
					<FormControlLabel control={<Switch checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} color='primary' />} label='Cambiar Contraseña' sx={{ pb: 1 }} />
					<Stack direction={"row"}>
						<TextField
							disabled={!changePassword}
							error={errorTexfield.password}
							label='Contraseña'
							variant='outlined'
							fullWidth
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => {
								setErrorTexfield({
									...errorTexfield,
									password: false,
								});
								setPassword(e.target.value);
							}}
							sx={{ pb: 1, pr: 1 }}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton disabled={!changePassword} onClick={handleTogglePasswordVisibility}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							disabled={!changePassword}
							error={errorTexfield.password}
							label='Repetir Contraseña'
							variant='outlined'
							fullWidth
							type={showPassword ? "text" : "password"}
							value={confirmarPassword}
							onChange={(e) => {
								setErrorTexfield({
									...errorTexfield,
									password: false,
								});
								setConfirmarPassword(e.target.value);
							}}
							sx={{ pb: 1 }}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton disabled={!changePassword} onClick={handleTogglePasswordVisibility}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Stack>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>cerrar</Button>
				<Button variant='contained' onClick={handleSave} color='primary'>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalMiPerfil;

import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { autenticarUsuarioConGoogle, autenticarUsuarioFB } from "../api/FirebaseService";

import { addToLocalStorage, createUserSession } from "../helpers/localStorageHelper";
import GoogleIcon from "../../public/images/icons/icon-google.png";
import { useAppContext } from "../context/AppProvider";
import { autenticarUsuario } from "../api/auth";
import { toast } from "react-toastify";
import { getExisteUser } from "../api/gets";
import { postUser } from "../api/posts";
import ModalRegistroUsuario from "../components/modals/ModalRegistroUsuario";

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{"Copyright © "}
			<b style={{ fontFamily: "Century Gothic" }}>El Tío - Barbershop </b>
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Login({ setShowNavigationBar, showModalRegistro, setShowModalRegistro }) {
	const [formData, setFormData] = useState({
		Correo: "",
		Password: "",
	});
	const { Correo, Password } = formData;

	const [errorLogin, setErrorLogin] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mensajeMayus, setMensajeMayus] = useState("");

	const { verifySession, setLoadinApp, setReload, setIsLoadingApp } = useAppContext();

	const navigate = useNavigate();
	//   const { token } = useParams();
	const timer = useRef();

	useEffect(() => {
		setShowNavigationBar(false);

		return () => {
			setShowNavigationBar(true);
		};
	}, []);

	//
	const handleSubmit = async (event) => {
		console.log("handleSubmit()");
		event.preventDefault();
		setLoading(true);
		timer.current = window.setTimeout(() => {
			handleLogin(formData.Correo, formData.Password);
		}, 500);
	};

	const handleLogin = async (correo, password) => {
		//setLoadinApp(true)
		try {
			const values = { correo: correo, password: password };
			const resp = await autenticarUsuario(values);
			console.log("resp resp", resp);
			if (resp.data.success) {
				// toast.success("Autenticación Exitosa");
				// console.log("resp.data.data", resp.data.data);
				addToLocalStorage("session", resp.data.data);
				navigate("/");
				setReload((prev) => !prev);
			} else {
				console.error("Error al Autenticarse", resp.data.error);
				toast.error("Credenciales Inválidas");
			}
		} catch (error) {
			console.error("Hubo un problema al autenticar", error);
			setLoading(false);
			toast.error("Ups, hay un problema con este proceso, por favor intente mas tarde");
		}
	};

	//1. Inicia sesion con google y obtiene sus credenciales
	//2. con esa informacion crea un nuevo usuario o accede en caso de ya haberlo.
	const handleLoginGoogle = async () => {
		console.log("handleLoginGoogle()");
		try {
			const userFB = await autenticarUsuarioConGoogle();
			const dataSessionGoogle = await createUserSession(userFB);
			if (await getExisteUser(dataSessionGoogle.email)) {
				// El usuario existe en la base de datos
				handleLogin(dataSessionGoogle.email, import.meta.env.VITE_PASSWORD_GOOGLE);
			} else {
				let arrayImages = [];
				arrayImages.push({ url: dataSessionGoogle.urlImage });
				const values = {
					nombre: dataSessionGoogle.username,
					password: import.meta.env.VITE_PASSWORD_GOOGLE,
					correo: dataSessionGoogle.email,
					imagenes: arrayImages,
					telefono: "",
				};
				handleCreateUser(values);
			}

			// verifySession();
			// navigate("/");
		} catch (e) {
			console.error("");
			// showMensajeError("Hubo un problema con su autententicación : " + e);
		}
	};

	// CREATE ACTION //
	const handleCreateUser = async (values) => {
		try {
			const resp = await postUser(values);
			console.log("resp", resp.data.success);
			if (resp.data.success) {
				toast.success("Se registró correctamente.");
				// INICIAR SESION
				handleLogin(values.correo, values.password);
			} else toast.error("Error al crear usuario.");
		} catch (error) {
			console.error("Error al crear el usuario:", error);
		}
	};

	const handleCloseModalRegistro = () => {
		setShowModalRegistro(false);
	};

	function isCapsLockOn(event) {
		const caps = event.getModifierState && event.getModifierState("CapsLock");
		if (caps) {
			setMensajeMayus("Las Mayúsculas están Activadas");
		} else {
			setMensajeMayus("");
		}
	}

	document.addEventListener("mouseenter", isCapsLockOn);
	document.addEventListener("keydown", isCapsLockOn);

	return (
		<Grid container component='main' sx={{ mt: -10, height: "100vh" }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(/images/sliders/principal/1.jpg)`,
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						mx: 6,
						my: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Inicio de Sesión
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
						<TextField error={errorLogin} onChange={(e) => setFormData({ ...formData, Correo: e.target.value })} margin='normal' required fullWidth label='E-mail' autoFocus value={Correo} />

						<TextField
							disabled={loading}
							helperText={mensajeMayus}
							error={errorLogin}
							onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
							margin='normal'
							required
							fullWidth
							label='Contraseña'
							type='password'
							value={Password}
							autoComplete='current-password'
						/>
						{/* <FormControlLabel
              control={
                <Checkbox
                  sx={{ m: "auto" }}
                  disabled={loading}
                  color="primary"
                  checked={formData.Recordar}
                  // onChange={handleOnChange}
                  name="Recordar"
                />
              }
              label="Recordar datos"
            /> */}

						<Grid container direction='column' alignItems='center' spacing={2}>
							<Grid item>
								<Button type='submit' disabled={loading} fullWidth variant='contained' sx={{ mt: 5, mb: 2, minHeight: 50 }}>
									Iniciar sesión
								</Button>
								<Button
									fullWidth
									variant='contained'
									startIcon={<img src={GoogleIcon} alt='Icono' style={{ width: 24, height: 24 }} />}
									onClick={handleLoginGoogle}
									color='inherit'
									sx={{ border: "1px solid black" }}
								>
									Iniciar sesión con Google
								</Button>
							</Grid>
						</Grid>
						<Grid container justifyContent='center'>
							<Grid item xs>
								{/* <br /> */}
								{/* {!loading && (
									<Link
										href='#'
										onClick={() => {
											// dispatch(CHANGE_STATE("showModalRecuperarPassword"));
										}}
									>
										¿Olvidó su contraseña?
									</Link>
								)} */}
								{/* <br /> */}
								{!loading && (
									<Typography sx={{ mt: 1 }}>
										¿Aun no tienes cuenta?{" "}
										<Link
											href='#'
											onClick={(event) => {
												event.preventDefault();
												setShowModalRegistro(true);
											}}
										>
											Registrarse
										</Link>
									</Typography>
								)}
							</Grid>
							<Grid item></Grid>
						</Grid>

						{errorLogin && (
							<Alert severity='error' sx={{ mt: 2 }}>
								<AlertTitle>¡ERROR!</AlertTitle>
								<b>
									Por favor revisa el <strong>Usuario</strong> y la <strong>Contraseña</strong>
								</b>
							</Alert>
						)}

						<Copyright sx={{ mt: 5 }} />
						<Box sx={{ display: "flex" }}>{loading && <CircularProgress variant='indeterminate' size={100} sx={{ m: "auto", mt: 5 }} />}</Box>
					</Box>
				</Box>
			</Grid>
			<ModalRegistroUsuario open={showModalRegistro} handleClose={handleCloseModalRegistro} />
		</Grid>
	);
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { cerrarSesionUsuario } from "../../api/FirebaseService";
import ModalMisCitasCliente from "../modals/ModalMisCitasCliente";
import ModalMisCitasBarbero from "../modals/ModalMisCitasBarbero";
import ModalMiPerfilCliente from "../modals/ModalMiPerfilCliente";
import ModalMiPerfilBarbero from "../modals/ModalMiPerfilBarbero";
import { scrollToTop } from "../../utils/screen";
import { Stack } from "@mui/material";
import ModalVacaciones from "../modals/ModalVacaciones";
import ModalDescanso from "../modals/ModalDescanso";

const PAGES_ADMIN = [
	{ title: "Citas", url: "/citas" },
	{ title: "Cursos", url: "/cursos" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },
	{ title: "Sucursales", url: "/sucursales" },

	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const PAGES_CLIENTE = [
	{ title: "Citas", url: "/citas" },
	{ title: "Cursos", url: "/cursos" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },
	{ title: "Sucursales", url: "/sucursales" },

	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const PAGES_BARBERO = [
	{ title: "Citas", url: "/citas" },
	{ title: "Cursos", url: "/cursos" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },

	{ title: "Sucursales", url: "/sucursales" },
	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const SETTINGS_AUTENTICATED_CLIENT = ["Mi perfil", "Mis citas", "Cerrar sesión"];
const SETTINGS_NO_AUTENTICATED = ["Iniciar sesión", "Registrarse"];

function NavigationBar({ setShowNavigationBar, setShowModalRegistro }) {
	const { flagTransparent, setIsLoading, isAutenticated, avatarURL, sessionDataStorage, windowWidth, setIsLoadingApp } = useAppContext();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [scrollY, setScrollY] = useState(0);
	const [showNModalMisCitas, setShowModalMisCitas] = useState(false);
	const [showModalVacaciones, setShowModalVacaciones] = useState(false);
	const [showModalDescanso, setShowModalDescanso] = useState(false);
	const [showNModalMiPerfil, setShowModalMiPerfil] = useState(false);
	const [pages, setPages] = useState(PAGES_CLIENTE);
	const [currentPage, setCurrentPage] = useState("");
	const [SETTINGS_AUTENTICATED, SETSETTINGS_AUTENTICATED] = useState(["Mis citas", "Mi perfil", "Descanso", "Administrar", "Cerrar sesión"]);

	const backgroundColor = scrollY === 0 ? "rgba(0, 0, 0, 0)" : "#333"; // Cambia el color dependiendo de la posición del scroll

	const appBarStyle = {
		boxShadow: "none",
		backgroundColor: "#333",
		transition: "background-color 0.5s ease", // Agrega una transición suave al cambio de color
		width: "100%", // Añadir esto para asegurar que AppBar ocupe todo el ancho
	};

	const appBarStyleTransparente = {
		boxShadow: "none",
		backgroundColor,
		transition: "background-color 0.5s ease", // Agrega una transición suave al cambio de color
		width: "100%", // Añadir esto para asegurar que AppBar ocupe todo el ancho
	};

	useEffect(() => {
		if (sessionDataStorage === null) setPages(PAGES_CLIENTE);
		else {
			switch (sessionDataStorage?.rol) {
				case "ADMINISTRADOR":
					setPages(PAGES_ADMIN);
					const indexToRemove = SETTINGS_AUTENTICATED.indexOf("Mis citas");
					// Si el elemento existe en el array, elimínalo
					if (indexToRemove !== -1) {
						SETTINGS_AUTENTICATED.splice(indexToRemove, 1);
					}
					SETSETTINGS_AUTENTICATED(SETTINGS_AUTENTICATED);
					break;
				case "BARBERO":
					setPages(PAGES_BARBERO);
					break;
				case "CLIENTE":
					setPages(PAGES_CLIENTE);
					break;
			}
		}
	}, [sessionDataStorage]);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleClickPage = (url) => {
		if (currentPage != url) {
			setCurrentPage(url);
			setIsLoadingApp(true);
			scrollToTop();
			handleCloseNavMenu();
			if (url === "/administracion") {
				setShowNavigationBar(false);
			}
			navigate(url);
		}
	};

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleClickSetting = (setting) => {
		switch (setting) {
			case "Iniciar sesión":
				navigate("/login");
				break;
			case "Registrarse":
				setShowModalRegistro(true);
				navigate("/login");
				break;
			case "Mi perfil":
				setShowModalMiPerfil(true);
				break;
			case "Mis citas":
				setShowModalMisCitas(true);
				break;
			case "Descanso":
				setShowModalDescanso(true);
				break;
			case "Vacaciones":
				setShowModalVacaciones(true);
				break;
			case "Administrar":
				setIsLoadingApp(true);
				navigate("/administracion");
				break;
			case "Cerrar sesión":
				handleCerrarSesion();
				break;
			default:
				break;
		}
		setAnchorElUser(null);
	};

	const handleCerrarSesion = () => {
		cerrarSesionUsuario();
	};

	const handleCloseModalMisCitas = () => {
		setShowModalMisCitas(false);
	};

	const handleCloseModalMiPerfil = () => {
		setShowModalMiPerfil(false);
	};
	const handleCloseModalVacaciones = () => {
		setShowModalVacaciones(false);
	};
	const handleCloseModalDescanso = () => {
		setShowModalDescanso(false);
	};

	return (
		<AppBar position='fixed' sx={flagTransparent ? appBarStyleTransparente : appBarStyle}>
			<Box sx={{ mx: { xs: 2, sm: 5 }, py: 0, border: 0 }}>
				<Toolbar disableGutters sx={{ width: "100%" }}>
					{windowWidth > 800 && (
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
							<Stack direction='row' alignItems='center' justifyContent='center'>
								{windowWidth >= 768 && (
									<Avatar
										src='images/icon-tio.png'
										onClick={() => handleClickPage("/")}
										style={{ cursor: "pointer" }} // Cambio de cursor a una manita
										sx={{ width: 60, height: 60, m: "auto" }}
									/>
								)}

								<Typography
									variant='h6'
									noWrap
									component='a'
									onClick={() => handleClickPage("/")}
									sx={{
										ml: 1,
										mr: 8,
										display: { xs: "none", md: "flex" },
										fontWeight: 700,
										letterSpacing: ".1rem",
										textDecoration: "none",
										cursor: "pointer",
										color: "#E2b753", // Color normal
										fontFamily: "Century Gothic",
										"&:hover": {
											color: "#fff", // Cambia el color a amarillo al hacer hover
										},
									}}
								>
									EL TÍO BARBERSHOP
								</Typography>
							</Stack>

							<Stack direction='row' alignItems='center' justifyContent='space-between'>
								{/*PAGINAS PC */}
								<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", mr: 5 }}>
									{pages.map((page) => (
										<Button
											key={page.title}
											onClick={() => handleClickPage(page.url)}
											sx={{
												my: 2,
												color: "white",
												display: "block",
												color: currentPage == page.url ? "#E2b753" : "#fff",
												"&:hover": {
													color: "#E2b753", // Cambia el color a amarillo al hacer hover
												},
											}}
										>
											<Typography
												sx={{
													fontFamily: "Century Gothic", // Cambia la fuente a Century Gothic
													fontWeight: 400, // Cambia el peso de la fuente
													fontSize: "1rem", // Cambia el tamaño de la fuente
													textTransform: "uppercase", // Cambia a mayúsculas
												}}
											>
												{page.title}
											</Typography>
										</Button>
									))}
								</Box>

								{/* MENU PC y MOBILE */}
								<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
									<Tooltip title='Menú de Usuario'>
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<AccountCircleOutlinedIcon sx={{ color: "white", width: 30, height: 30 }} />
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "30px" }}
										id='menu-appbar'
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleClickSetting}
									>
										{sessionDataStorage !== null ? (
											<Box textAlign='center' sx={{ color: "black", width: 180 }}>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
													}}
												>
													{sessionDataStorage?.rol == "BARBERO" && sessionDataStorage?.descanso == "NO" && (
														<Avatar alt='Imagen de perfil' src={sessionDataStorage.imagenes[0]?.url} sx={{ height: 100, width: 100, marginBottom: "10px" }} />
													)}

													{sessionDataStorage?.rol == "CLIENTE" && <Avatar alt='Imagen de perfil' src={sessionDataStorage.imagenes[0]?.url} sx={{ height: 100, width: 100, marginBottom: "10px" }} />}
													{sessionDataStorage?.rol == "BARBERO" && sessionDataStorage?.descanso == "SI" && (
														<Avatar alt='Imagen de perfil' src={"/images/descanso.webp"} sx={{ height: 100, width: 100, marginBottom: "10px" }} />
													)}

													<Typography variant='h6' gutterBottom>
														<strong>{sessionDataStorage.nombre}</strong>
													</Typography>
													<Typography variant='h6'>{sessionDataStorage?.rol}</Typography>
													{sessionDataStorage?.esAdmin && (
														<Typography variant='h6' sx={{ mt: -1 }}>
															ADMIN
														</Typography>
													)}
												</Box>
												<Divider sx={{ marginTop: "20px", marginBottom: "0px" }} />
												{sessionDataStorage?.rol === "ADMINISTRADOR" || sessionDataStorage?.rol === "BARBERO"
													? SETTINGS_AUTENTICATED.map((setting) => {
															if (sessionDataStorage?.rol === "ADMINISTRADOR" && (setting == "Descanso" || setting == "Mi perfil")) {
															} else
																return (
																	<MenuItem
																		sx={{
																			"&:hover": {
																				backgroundColor: setting === "Cerrar sesión" ? "#EC181A" : "none",
																				color: setting === "Cerrar sesión" ? "#FFF" : "none",
																			},
																			color: setting === "Cerrar sesión" ? "white" : "black",
																			backgroundColor: setting === "Cerrar sesión" ? "#f51719" : "none",
																		}}
																		key={setting}
																		onClick={() => handleClickSetting(setting)}
																	>
																		<Typography>{setting}</Typography>
																	</MenuItem>
																);
													  })
													: SETTINGS_AUTENTICATED_CLIENT.map((setting) => (
															<MenuItem
																sx={{
																	"&:hover": {
																		backgroundColor: setting === "Cerrar sesión" ? "#EC181A" : "none",
																		color: setting === "Cerrar sesión" ? "#FFF" : "none",
																	},
																	color: setting === "Cerrar sesión" ? "white" : "black",
																	backgroundColor: setting === "Cerrar sesión" ? "#f51719" : "none",
																}}
																key={setting}
																onClick={() => handleClickSetting(setting)}
															>
																<Typography>{setting}</Typography>
															</MenuItem>
													  ))}
											</Box>
										) : (
											SETTINGS_NO_AUTENTICATED.map((setting) => (
												<MenuItem key={setting} onClick={() => handleClickSetting(setting)}>
													<Typography textAlign='center'>{setting}</Typography>
												</MenuItem>
											))
										)}
									</Menu>
								</Box>
							</Stack>
						</Box>
					)}

					{windowWidth <= 800 && (
						<>
							{" "}
							{/*   PAGINAS y LOGO mobile */}
							<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "center" }}>
								<IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='white' sx={{ ml: -2 }}>
									<MenuIcon sx={{ color: "white", width: 30, height: 30 }} />
								</IconButton>

								{windowWidth <= 768 && (
									<Avatar
										src='images/icon-tio.png'
										onClick={() => handleClickPage("/")}
										style={{ cursor: "pointer" }} // Cambio de cursor a una manita
										sx={{ width: 80, height: 80, m: "auto" }}
									/>
								)}

								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
									}}
								>
									{pages.map((page) => (
										<MenuItem key={page.title} onClick={() => handleClickPage(page.url)}>
											<Typography
												textAlign='center'
												sx={{
													fontFamily: "Century Gothic",
													cursor: "pointer",
													"&:hover": {
														color: "#E2b753", // Cambia el color a amarillo al hacer hover
													},
												}}
											>
												{page.title}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							{/* MENU PC y MOBILE */}
							<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
								<Tooltip title='Menú de Usuario'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<AccountCircleOutlinedIcon sx={{ color: "white", width: 30, height: 30 }} />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "30px" }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleClickSetting}
								>
									{sessionDataStorage !== null ? (
										<Box textAlign='center' sx={{ color: "black", width: 180 }}>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
												}}
											>
												{sessionDataStorage?.rol == "CLIENTE" && <Avatar alt='Imagen de perfil' src={sessionDataStorage.imagenes[0]?.url} sx={{ height: 100, width: 100, marginBottom: "10px" }} />}
												{sessionDataStorage?.rol == "BARBERO" && sessionDataStorage?.descanso == "NO" && (
													<Avatar alt='Imagen de perfil' src={sessionDataStorage.imagenes[0]?.url} sx={{ height: 100, width: 100, marginBottom: "10px" }} />
												)}
												{sessionDataStorage?.rol == "BARBERO" && sessionDataStorage?.descanso == "SI" && (
													<Avatar alt='Imagen de perfil' src={"/images/descanso.webp"} sx={{ height: 100, width: 100, marginBottom: "10px" }} />
												)}
												<Typography variant='h6' gutterBottom>
													<strong>{sessionDataStorage.nombre}</strong>
												</Typography>
												<Typography variant='h6'>{sessionDataStorage?.rol}</Typography>
											</Box>
											<Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
											{sessionDataStorage?.rol === "ADMINISTRADOR" || sessionDataStorage?.rol === "BARBERO"
												? SETTINGS_AUTENTICATED.map((setting) => {
														if (sessionDataStorage?.rol === "ADMINISTRADOR" && (setting == "Descanso" || setting == "Mi perfil")) {
														} else
															return (
																<MenuItem
																	sx={{ color: setting === "Cerrar sesión" ? "white" : "black", backgroundColor: setting === "Cerrar sesión" ? "#f51719" : "none" }}
																	key={setting}
																	onClick={() => handleClickSetting(setting)}
																>
																	<Typography>{setting}</Typography>
																</MenuItem>
															);
												  })
												: SETTINGS_AUTENTICATED_CLIENT.map((setting) => (
														<MenuItem
															sx={{ color: setting === "Cerrar sesión" ? "white" : "black", backgroundColor: setting === "Cerrar sesión" ? "#f51719" : "none" }}
															key={setting}
															onClick={() => handleClickSetting(setting)}
														>
															<Typography>{setting}</Typography>
														</MenuItem>
												  ))}
										</Box>
									) : (
										SETTINGS_NO_AUTENTICATED.map((setting) => (
											<MenuItem key={setting} onClick={() => handleClickSetting(setting)}>
												<Typography textAlign='center'>{setting}</Typography>
											</MenuItem>
										))
									)}
								</Menu>
							</Box>
						</>
					)}
				</Toolbar>
			</Box>
			{/* MODALES */}
			{sessionDataStorage?.rol === "BARBERO" && <ModalMisCitasBarbero open={showNModalMisCitas} handleClose={handleCloseModalMisCitas} />}
			{sessionDataStorage?.rol === "BARBERO" && <ModalMiPerfilBarbero open={showNModalMiPerfil} handleClose={handleCloseModalMiPerfil} />}
			{sessionDataStorage?.rol === "BARBERO" && <ModalVacaciones open={showModalVacaciones} handleClose={handleCloseModalVacaciones} />}
			{sessionDataStorage?.rol === "BARBERO" && <ModalDescanso open={showModalDescanso} handleClose={handleCloseModalDescanso} />}
			{sessionDataStorage?.rol === "CLIENTE" && <ModalMisCitasCliente open={showNModalMisCitas} handleClose={handleCloseModalMisCitas} />}
			{sessionDataStorage?.rol === "CLIENTE" && <ModalMiPerfilCliente open={showNModalMiPerfil} handleClose={handleCloseModalMiPerfil} />}
		</AppBar>
	);
}

export default NavigationBar;

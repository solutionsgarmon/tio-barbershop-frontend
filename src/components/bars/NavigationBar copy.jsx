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

const PAGES_ADMIN = [
	{ title: "Citas", url: "/citas" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },
	{ title: "Sucursales", url: "/sucursales" },
	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const PAGES_CLIENTE = [
	{ title: "Citas", url: "/citas" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },
	{ title: "Sucursales", url: "/sucursales" },
	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const PAGES_BARBERO = [
	{ title: "Citas", url: "/citas" },
	{ title: "Servicios", url: "/servicios" },
	{ title: "Tienda", url: "/tienda" },
	{ title: "Sucursales", url: "/sucursales" },
	{ title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const SETTINGS_AUTENTICATED_CLIENT = ["Mi perfil", "Mis citas", "Cerrar sesión"];
const SETTINGS_NO_AUTENTICATED = ["Iniciar sesión", "Registrarse"];

function NavigationBar({ setShowNavigationBar, setShowModalRegistro }) {
	const { flagTransparent, setIsLoading, isAutenticated, avatarURL, sessionDataStorage, windowWidth } = useAppContext();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [scrollY, setScrollY] = useState(0);
	const [showNModalMisCitas, setShowModalMisCitas] = useState(false);
	const [showNModalMiPerfil, setShowModalMiPerfil] = useState(false);
	const [pages, setPages] = useState(PAGES_CLIENTE);
	const [SETTINGS_AUTENTICATED, SETSETTINGS_AUTENTICATED] = useState(["Mis citas", "Mi perfil", "Administrar", "Cerrar sesión"]);

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
		scrollToTop();
		handleCloseNavMenu();
		if (url === "/administracion") setShowNavigationBar(false);
		navigate(url);
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
			case "Administrar":
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
		window.location.reload();
	};

	const handleCloseModalMisCitas = () => {
		setShowModalMisCitas(false);
	};

	const handleCloseModalMiPerfil = () => {
		setShowModalMiPerfil(false);
	};

	return (
		<AppBar position='fixed' sx={flagTransparent ? appBarStyleTransparente : appBarStyle}>
			<Container>
				<Toolbar disableGutters>
					<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Avatar src='images/icon-tio.png' onClick={() => handleClickPage("/")} sx={{ width: 80, height: 80, cursor: "pointer", mr: 2 }} />
							<Typography
								variant='h6'
								noWrap
								component='a'
								onClick={() => handleClickPage("/")}
								sx={{
									fontFamily: "Century Gothic",
									fontWeight: 700,
									letterSpacing: ".1rem",
									color: "#E2b753",
									textDecoration: "none",
									cursor: "pointer",
									"&:hover": {
										color: "#fff",
									},
									display: { xs: "none", md: "flex" },
								}}
							>
								EL TÍO BARBERSHOP
							</Typography>
						</Box>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
							{pages.map((page) => (
								<Button key={page.title} onClick={() => handleClickPage(page.url)} sx={{ my: 2, color: "white", display: "block" }}>
									{page.title}
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Menú de Usuario'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<AccountCircleOutlinedIcon sx={{ color: "white", width: 30, height: 30 }} />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default NavigationBar;

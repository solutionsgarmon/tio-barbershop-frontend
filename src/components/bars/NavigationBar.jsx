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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { cerrarSesionUsuario } from "../../api/FirebaseService";

const PAGES_ADMIN = [
  { title: "Citas", url: "/citas" },
  { title: "Servicios", url: "/servicios" },
  { title: "Cursos", url: "/cursos" },
  { title: "Tienda", url: "/tienda" },
  { title: "Sucursales", url: "/sucursales" },
  { title: "Sobre Nosotros", url: "/sobre-nosotros" },
  { title: "Administrar", url: "/administracion" },
];

const PAGES_CLIENTE = [
  { title: "Citas", url: "/citas" },
  { title: "Servicios", url: "/servicios" },
  { title: "Cursos", url: "/cursos" },
  { title: "Tienda", url: "/tienda" },
  { title: "Sucursales", url: "/sucursales" },
  { title: "Sobre Nosotros", url: "/sobre-nosotros" },
];

const PAGES_BARBERO = [
  { title: "Citas", url: "/citas" },
  { title: "Servicios", url: "/servicios" },
  { title: "Cursos", url: "/cursos" },
  { title: "Tienda", url: "/tienda" },
  { title: "Sucursales", url: "/sucursales" },
  { title: "Sobre Nosotros", url: "/sobre-nosotros" },
  { title: "Administrar", url: "/administracion" },
];

const SETTINGS_AUTENTICATED = ["Mi perfil", "Mis citas", "Cerrar sesión"];
const SETTINGS_NO_AUTENTICATED = ["Iniciar sesión"];

function NavigationBar({ setShowNavigationBar }) {
  const {
    flagTransparent,
    setIsLoading,
    isAutenticated,
    avatarURL,
    sessionDataStorage,
  } = useAppContext();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [pages, setPages] = useState(PAGES_CLIENTE);

  const backgroundColor = scrollY === 0 ? "rgba(0, 0, 0, 0)" : "#333"; // Cambia el color dependiendo de la posición del scroll

  const appBarStyle = {
    boxShadow: "none",
    backgroundColor: "#333",
    transition: "background-color 0.5s ease", // Agrega una transición suave al cambio de color
  };

  const appBarStyleTransparente = {
    boxShadow: "none",
    backgroundColor,
    transition: "background-color 0.5s ease", // Agrega una transición suave al cambio de color
  };

  useEffect(() => {
    if (sessionDataStorage === null) setPages(PAGES_CLIENTE);
    else {
      switch (sessionDataStorage.rol) {
        case "ADMINISTRADOR":
          setPages(PAGES_ADMIN);
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
    console.log("flagTransparent", flagTransparent);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickPage = (url) => {
    console.log("handleClickPage()", url);
    handleCloseNavMenu();
    if (url == "/administracion") setShowNavigationBar(false);
    navigate(url);
  };

  const handleOpenNavMenu = (event) => {
    console.log("handleOpenNavMenu()");
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickSetting = (setting) => {
    const optionSelected = setting;
    console.log("Clic en", optionSelected);
    switch (optionSelected) {
      case "Iniciar sesión":
        navigate("/login");
        break;
      case "Mi perfil":
        navigate("/mi-perfil");
        break;
      case "Cerrar sesión":
        handleCerrarSesion();
        break;
    }
    setAnchorElUser(null);
  };

  const handleCerrarSesion = () => {
    cerrarSesionUsuario();
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={flagTransparent ? appBarStyleTransparente : appBarStyle}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* PC */}
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          {/* <img src="images/icon-tio.png" height={40} width={40} /> */}
          <img
            src="images/icon-tio2.png"
            height={50}
            width={50}
            onClick={() => handleClickPage("/")}
            style={{ cursor: "pointer" }} // Cambio de cursor a una manita
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleClickPage("/")}
            sx={{
              ml: 1,
              mr: 8,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              color: "yellow",
            }}
          >
            EL TÍO BARBERSHOP
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
                <MenuItem
                  key={page.title}
                  onClick={() => handleClickPage(page.url)}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "yellow", // Cambia el color a amarillo al hacer hover
                      },
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleClickPage(page.url)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    color: "yellow", // Cambia el color a amarillo al hacer hover
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open SETTINGS">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Imagen de perfil"
                  src={
                    sessionDataStorage !== null
                      ? sessionDataStorage.datos_personales.imagen
                      : ""
                  }
                  sx={{ height: 35, width: 35 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
                <Box textAlign="center" sx={{ color: "black", width: 180 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="Imagen de perfil"
                      src={
                        sessionDataStorage !== null
                          ? sessionDataStorage.datos_personales.imagen
                          : ""
                      }
                      sx={{ height: 100, width: 100, marginBottom: "10px" }}
                    />
                    <Typography variant="h6" gutterBottom>
                      <strong>{sessionDataStorage.nombre}</strong>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {sessionDataStorage.rol}
                    </Typography>
                  </Box>
                  <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  {SETTINGS_AUTENTICATED.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleClickSetting(setting)}
                    >
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Box>
              ) : (
                <>
                  {SETTINGS_NO_AUTENTICATED.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleClickSetting(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;

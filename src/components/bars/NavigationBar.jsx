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
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";

const PAGES = [
  { title: "Citas", url: "/citas" },
  { title: "Servicios", url: "/servicios" },
  { title: "Tienda", url: "/tienda" },
  { title: "Sucursales", url: "/sucursales" },
  { title: "Sobre Nosotros", url: "/sobre-nosotros" },
  { title: "Administrar", url: "/administracion" },
];

const SETTINGS = ["Mi perfil", "Mis citas", "Cerrar sesión"];

function NavigationBar({ setShowNavigationBar }) {
  const { flagTransparent, setIsLoading } = useAppContext();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
              {PAGES.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleClickPage(page.url)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {PAGES.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleClickPage(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
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
                  src="/images/avatar1.png"
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
              onClose={handleCloseUserMenu}
            >
              {SETTINGS.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import AssessmentIcon from "@mui/icons-material/Assessment";

import Header from "./Header";
import { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RecommendIcon from "@mui/icons-material/Recommend";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useEffect } from "react";
import Users from "./usuarios/Users";
import Barbershops from "./barberias/Barbershops";
import Posts from "./post/Posts";
import Products from "./productos/Products";
import Services from "./servicios/Services";
import ExampleWithProviders from "./TableExample";
import { useAppContext } from "../../context/AppProvider";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Cursos from "./cursos/Cursos";
import MainPage from "./MainPage";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import Groups2Icon from "@mui/icons-material/Groups2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Barbers from "./barberos/Barbers";
import Administradores from "./administradores/Administradores";
import FeedIcon from "@mui/icons-material/Feed";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import Citas from "./citas/Citas";
import ReportesBarbero from "./reportes/ReportesBarbero";
import ReportesAdministrador from "./reportes/ReportesAdministrador";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"El Tío Barbershop © "}
      <Link color="inherit" href="https:// www.eltiobarbershop.com/">
        www.eltiobarbershop.com -
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const categories_administrador = [
  {
    id: "REPORTES",

    children: [
      {
        id: "General",
        icon: <SummarizeIcon />,
        tabs: ["Balance"],
        component: <ReportesAdministrador />,
      },
    ],
  },
  {
    id: "USUARIOS",

    children: [
      {
        id: "Clientes",
        icon: <Groups2Icon />,
        tabs: ["Clientes", "Citas"],
        component: <Users />,
      },

      {
        id: "Barberos",
        icon: <Diversity3Icon />,
        tabs: ["Barberos", "Horario", "Imágenes"],
        component: <Barbers />,
      },
      {
        id: "Administradores",
        icon: <SupervisorAccountIcon />,
        tabs: ["Administradores"],
        component: <Administradores />,
      },
    ],
  },
  {
    id: "BASE DE DATOS",

    children: [
      {
        id: "Servicios",
        icon: <ContentCutIcon />,
        tabs: ["Servicios", "Imágenes"],
        component: <Services />,
      },
      {
        id: "Productos",
        icon: <SanitizerIcon />,
        tabs: ["Productos", "Imágenes"],
        component: <Products />,
      },
      {
        id: "Barberías",
        icon: <StorefrontIcon />,
        tabs: ["Barberias", "Barberos", "Productos", "Horario", "Imágenes"],
        component: <Barbershops />,
      },
      {
        id: "Cursos",
        icon: <MenuBookIcon />,
        tabs: ["Cursos", "Fechas", "Imágenes"],
        component: <Cursos />,
      },
    ],
  },
  {
    id: "APLICACIÓN",
    children: [
      {
        id: "Posts",
        icon: <NewspaperIcon />,
        tabs: ["Publicaciones"],
        component: <Posts />,
      },
      {
        id: "Recomendaciones",
        icon: <RecommendIcon />,
        tabs: [],
        component: <Posts />,
      },
      {
        id: "Galeria",
        icon: <CollectionsIcon />,
        tabs: ["Barberos", "Servicios", "Barberías"],
        component: <Posts />,
      },
      {
        id: "Citas",
        icon: <CalendarMonthIcon />,
        tabs: ["Citas"],
        component: <Citas />,
      },
    ],
  },
  {
    id: "CONFIGURACIÓN",
    children: [
      {
        id: "Personalización",
        icon: <SettingsIcon />,
        tabs: ["Preferencias", "Ajustes"],
        component: <Posts />,
      },
    ],
  },
];

const categories_barbero = [
  // {
  //   id: "Mi Perfil",

  //   children: [
  //     {
  //       id: "Mis datos ",
  //       icon: <FeedIcon />,
  //       tabs: ["Mis Datos"],
  //       component: <Barbers />,
  //     },
  //   ],
  // },
  {
    id: "Citas",

    children: [
      {
        id: "Mis citas",
        icon: <EventIcon />,
        tabs: ["Citas"],
        component: <Citas />,
      },
    ],
  },
  {
    id: "Reportes",
    children: [
      {
        id: "Mis reportes",
        icon: <AssessmentIcon />,
        tabs: ["Mis reportes"],
        component: <ReportesBarbero />,
      },
    ],
  },
  // {
  //   id: "Publicaciones",

  //   children: [
  //     {
  //       id: "Lista de Publicaciones",
  //       icon: <DescriptionIcon />,
  //       tabs: ["Clientes", "Citas"],
  //       component: <Users />,
  //     },
  //   ],
  // },
];

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [idCategorieSelected, setIdCategorieSelected] = useState(null);
  const [displayTabs, setDisplayTabs] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(null);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [categoriasMapear, setCategoriasMapear] = useState([]);

  const {
    windowWidth,
    indexTabSelected,
    setIndexTabSelected,
    sessionDataStorage,
  } = useAppContext();

  useEffect(() => {
    console.log("isSmUp", isSmUp);
  }, [windowWidth]);

  useEffect(() => {
    // setDisplayComponent(<MainPage />);
    setDisplayComponent(<></>);
    if (sessionDataStorage) {
      if (sessionDataStorage.rol == "ADMINISTRADOR")
        setCategoriasMapear(categories_administrador);
      else if (sessionDataStorage.rol == "BARBERO")
        setCategoriasMapear(categories_barbero);
    } else {
      console.error("No se encontro la sesionDataStorage del Usuario");
    }
  }, []);

  useEffect(() => {
    const categorySelected = categoriasMapear.find((cat) =>
      cat.children.some((child) => child.id === idCategorieSelected)
    );

    if (categorySelected) {
      const selectedChildren = categorySelected.children.find(
        (child) => child.id === idCategorieSelected
      );

      setDisplayTabs(selectedChildren.tabs);
      setDisplayComponent(selectedChildren.component);
    }
  }, [idCategorieSelected]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleShowMainPage = () => {
    //TODO cambia
    // setDisplayComponent(<MainPage />);
    setDisplayComponent(<Citas />);
    setDisplayTabs(null);
    setIndexTabSelected(0);
    setIdCategorieSelected(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              categories={categoriasMapear}
              setIdCategorieSelected={setIdCategorieSelected}
              handleShowMainPage={handleShowMainPage}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            categories={categoriasMapear}
            setIdCategorieSelected={setIdCategorieSelected}
            handleShowMainPage={handleShowMainPage}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            tabs={displayTabs}
            isSmUp={isSmUp}
            setIndexTabSelected={setIndexTabSelected}
            indexTabSelected={indexTabSelected}
          />
          {/* Ventana que cambia */}
          <Box
            component="main"
            sx={{
              flex: 1,
              bgcolor: "#EEE",
              m: { xs: 1, md: 2 },
              maxWidth: isSmUp
                ? `${windowWidth - 290}px`
                : `${windowWidth - 18}px`,
            }}
          >
            {displayComponent}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#EEE" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FloatingAddButton from "../components/atoms/FloatingButtons";
import PrincipalSlider from "../components/sliders/PrincipalSlider";
import { useAppContext } from "../context/AppProvider";
import GoogleMap from "../components/molecules/GoogleMap";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import CardServices from "../components/cards/CardServices";
import CardServicesMainSlider from "../components/cards/CardServicesMainSlider";
import AutoplaySlider from "../components/sliders/AutoplaySlider";
import CardRecomendacion from "../components/cards/CardRecomendacion";

const MainPage = ({ services, products }) => {
  const { setFlagTransparent } = useAppContext();
  const navigate = useNavigate();

  const banners = [
    {
      image: "/images/sliders/principal/1.jpg",
      text1: "",
      text2: "",
      component: <></>,
      // (
      //   <Button variant="outlined" sx={{ width: 300, fontWeight: "bold" }}>
      //     Conócelos
      //   </Button>
      // ),
    },
    {
      image: "/images/sliders/principal/2.jpg",
      text1: "Nuestras Sucursales",
      text2: "Conoce",
      component: (
        <Button
          onClick={() => {
            navigate("/sucursales");
          }}
          variant="outlined"
          sx={{ width: 300, fontWeight: "bold" }}
        >
          Ver sucursales
        </Button>
      ),
    },
    {
      image: "/images/sliders/principal/3.jpg",
      text1: "Agenda una Cita",
      text2: "Conciéntete",
      component: (
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/citas");
          }}
          sx={{ width: 300, fontWeight: "bold" }}
        >
          Agendar
        </Button>
      ),
    },
    {
      image: "/images/sliders/principal/4.jpg",

      text1: "Nuestros Productos",
      text2: "Adquiere",
      component: (
        <Button
          onClick={() => {
            navigate("/tienda");
          }}
          variant="outlined"
          sx={{ width: 300, fontWeight: "bold" }}
        >
          Visitar Tienda
        </Button>
      ),
    },
    {
      image: "/images/sliders/principal/5.jpg",
      text1: "Nuestras Sucursales",
      text2: "Conoce",
      component: (
        <Button
          onClick={() => {
            navigate("/sucursales");
          }}
          variant="outlined"
          sx={{ width: 300, fontWeight: "bold" }}
        >
          Ver sucursales
        </Button>
      ),
    },
  ];

  useEffect(() => {
    setFlagTransparent(true);

    return () => {
      setFlagTransparent(false);
    };
  }, []);

  const handleClickFloatingButton = () => {
    console.log("handleClickFloatingButton");
    navigate("/citas");
  };

  return (
    <Box sx={{ mt: -10 }}>
      <PrincipalSlider banners={banners} />
      <Box
        sx={{ backgroundColor: "#000", height: "500px", overflowX: "hidden" }}
      >
        <Typography
          gutterBottom
          variant={"h4"}
          component="div"
          sx={{
            textAlign: "center",
            height: 75,
            pt: { xs: 5, sm: 5 },
            color: "#e2b753",
          }}
        >
          NUESTROS SERVICIOS
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
          }}
        >
          <Stack direction={"row"} spacing={2} sx={{ mx: 1.5 }}>
            {services?.map((servicio, index) => (
              <Box key={index} sx={{ m: 2 }}>
                <CardServicesMainSlider
                  servicio={servicio}
                  withButtons={false}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#333",
          width: "100%",
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            textAlign: "center",
            height: 75,
            color: "#e2b753",
          }}
        >
          LO MAS VENDIDO
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ justifyContent: "center" }}
          >
            <Avatar
              src={products[1]?.imagenes[0].url}
              sx={{
                borderRadius: 5,
                mx: 3,
                height: 300,
                width: 300,
              }}
            />
            <Stack
              direction={"column"}
              sx={{ justifyContent: "center", mx: 3, mt: { xs: 5, sm: 0 } }}
            >
              <Typography
                variant="h3"
                maxWidth={300}
                color={"white"}
                sx={{ mb: 5 }}
              >
                {products[1]?.nombre}
              </Typography>
              <Typography variant="h6" maxWidth={300} color={"white"}>
                {products[1]?.descripcion}
              </Typography>
              <Button variant="outlined" sx={{ py: 1, mt: 2 }}>
                Visitar Tienda
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#000",
          width: "100%",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography
          gutterBottom
          variant={"h4"}
          component="div"
          sx={{
            height: 75,
            mt: { xs: 5, sm: 3 },
            mb: { xs: 5, sm: 0 },
            color: "#e2b753",
          }}
        >
          CLIENTES QUE NOS RECOMIENDAN
        </Typography>

        <AutoplaySlider />
      </Box>

      <FloatingAddButton
        handleClickFloatingButton={handleClickFloatingButton}
      />
    </Box>
  );
};

export default MainPage;

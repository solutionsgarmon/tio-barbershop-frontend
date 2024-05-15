import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import FloatingAddButton from "../components/atoms/FloatingButtons";
import PrincipalSlider from "../components/sliders/PrincipalSlider";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import CardServicesMainSlider from "../components/cards/CardServicesMainSlider";
import Century_Gothic from "../fonts/Century_Gothic.ttf";

const MainPage = ({ services, products }) => {
  const { setFlagTransparent, appSettings } = useAppContext();
  const navigate = useNavigate();

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
      <PrincipalSlider banners={appSettings.main_slider} />
      <Box
        sx={{
          backgroundColor: "#1f1f1f",
          height: "560px", //ALTURA DEL BOX NEGRO

          textAlign: "center",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
          maxWidth: "100%",
          "&::-webkit-scrollbar": { height: "5px" },
        }}
      >
        <Typography
          gutterBottom
          variant={"h4"}
          component="div"
          sx={{
            textAlign: "center",
            height: 75,
            pt: { xs: 5, sm: 5 },
            pb: { xs: 7, sm: 9 },
            color: "#e2b753",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontFamily: "Century Gothic",
          }}
        >
          NUESTROS SERVICIOS
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
            textAlign: "center",
            "&::-webkit-scrollbar": { height: "6px" },
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
        <Typography
          color={"#FFF"}
          sx={{
            fontFamily: "Century Gothic",
            fontSize: { xs: "0.9rem", sm: "1.2rem" },
            py: 3,
            mx: 2,
          }}
        >
          Todos los servicios incluyen mascarilla negra, delineado de cejas y
          bebida de cortesía.
        </Typography>
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
            fontSize: { xs: "1.5rem", sm: "2rem" },
            mb: { xs: -1, sm: 1 },
            fontFamily: "Century Gothic",
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
                variant="h4"
                maxWidth={300}
                color={"white"}
                sx={{ mb: 5, fontFamily: "Century Gothic" }}
              >
                {products[1]?.nombre}
              </Typography>
              <Typography
                variant="h6"
                maxWidth={300}
                color={"white"}
                sx={{ fontFamily: "Century Gothic" }}
              >
                {products[1]?.descripcion}
              </Typography>
              <Button
                onClick={() => {
                  navigate("/tienda");
                }}
                variant="outlined"
                sx={{ py: 1, mt: 2, fontFamily: "Century Gothic" }}
              >
                Visitar Tienda
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* <Box
        sx={{
          backgroundColor: "#1f1f1f",
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
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          CLIENTES QUE NOS RECOMIENDAN
        </Typography>

        <AutoplaySlider />
      </Box> */}

      <FloatingAddButton
        handleClickFloatingButton={handleClickFloatingButton}
      />
    </Box>
  );
};

export default MainPage;

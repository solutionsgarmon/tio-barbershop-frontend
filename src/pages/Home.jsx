import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import FloatingAddButton from "../components/atoms/FloatingButtons";
import PrincipalSlider from "../components/sliders/PrincipalSlider";
import { useAppContext } from "../context/AppProvider";
import GoogleMap from "../components/molecules/GoogleMap";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { setFlagTransparent } = useAppContext();
  const navigate = useNavigate();

  const elements = [
    {
      image: "/images/sliders/principal/slider2.jpg",
      link: "www.fb.com",
    },
    {
      image: "/images/sliders/principal/slider3.jpg",
      link: "www.google.com",
    },
    {
      image: "/images/sliders/principal/slider4.jpg",
      link: "www.instagram.com",
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
      <PrincipalSlider elements={elements} />
      <Box sx={{ backgroundColor: "#000", width: "100%", height: "500px" }}>
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
      </Box>
      <Box sx={{ backgroundColor: "#333", width: "100%", height: "500px" }}>
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
          LO MAS VENDIDO
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#000", width: "100%", height: "500px" }}>
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
          CLIENTES QUE NOS RECOMIENDAN
        </Typography>
      </Box>

      <FloatingAddButton
        handleClickFloatingButton={handleClickFloatingButton}
      />
    </Box>
  );
};

export default MainPage;

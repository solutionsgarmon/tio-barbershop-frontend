import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardRecomendacion from "../cards/CardRecomendacion";
import { Box } from "@mui/material";

const AutoplaySlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 2000, // Ajusta la velocidad del desplazamiento (en milisegundos)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Tiempo en milisegundos entre cada slide
  };

  return (
    <Box sx={{ mx: 4 }}>
      <Slider {...settings}>
        <div>
          <CardRecomendacion />
        </div>
        <div>
          <CardRecomendacion />
        </div>
      </Slider>
    </Box>
  );
};

export default AutoplaySlider;

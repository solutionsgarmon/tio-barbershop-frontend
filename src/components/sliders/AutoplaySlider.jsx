import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardRecomendacion from "../cards/CardRecomendacion";

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
    <Slider {...settings}>
      <div>
        <CardRecomendacion />
      </div>
      <div>
        <CardRecomendacion />
      </div>
    </Slider>
  );
};

export default AutoplaySlider;

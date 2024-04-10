import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
// import { useAppContext } from "../../../app/AppProvider";

const PrincipalSlider = ({ elements }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ mt: -8.5 }}>
      <Carousel
        sx={{ zIndex: 0 }}
        navButtonsWrapperProps="false"
        navButtonsProps={false}
        stopAutoPlayOnHover={false}
        autoPlay={true}
        animation="fade"
        // animation="slide"
        duration={1500}
        interval={isMobile ? 6000 : 6000}
        indicators={false}
        navButtonsAlwaysInvisible={true}

        //Puntitos de abajo
      >
        {elements.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              key={index}
              style={{
                position: "relative",

                height: isMobile ? "300px" : "400px",
                overflow: "hidden",
              }}
            >
              <img
                key={index}
                src={item.image}
                alt={item.link}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Para asegurar que la imagen cubra el contenedor
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "100%", // Comienza el degradado desde la mitad

                  width: "100%",
                  height: "500%", // cuanto porcentaje de abajo a arriba quiero que se desbanesca
                  backgroundImage:
                    "linear-gradient(to bottom, transparent, rgba(0,0,0, 0.7))", //Transparencia
                  transform: "translateY(-100%)", // Ajusta el posicionamiento vertical
                }}
              />
            </div>
          </a>
        ))}
      </Carousel>
    </Box>
  );
};

export default PrincipalSlider;

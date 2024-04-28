import {
  Box,
  Fade,
  Grid,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Zoom from "@mui/material/Zoom";

const PrincipalSlider = ({ banners }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (showText) {
      const toggleInterval = setInterval(() => {
        setShowText((prev) => false); // Cambia el valor actual de showText
      }, 6000); // Cambia cada 6 segundos

      return () => clearInterval(toggleInterval); // Limpia el intervalo cuando el componente se desmonta
    }
  }, []);

  useEffect(() => {
    if (!showText) {
      const timeoutId = setTimeout(() => {
        setShowText(true); // Cambia el valor actual de showText después de 1 segundo
      }, 1000); // Espera 1 segundo (1000 milisegundos)

      return () => {
        clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta antes de que se ejecute
      };
    }
  }, [showText]);

  return (
    <Box sx={{ mt: -8.5 }}>
      <Carousel
        sx={{ zIndex: 0 }}
        navButtonsWrapperProps="false"
        navButtonsProps={false}
        stopAutoPlayOnHover={false}
        autoPlay={true}
        animation="fade"
        duration={1500}
        interval={isMobile ? 6000 : 6000}
        indicators={false}
        navButtonsAlwaysInvisible={true}
      >
        {banners.map((item, index) => (
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
                height: isMobile ? "70vh" : "102vh",
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
                  objectFit: "cover",
                }}
              />
              {/* Contenedor para las letras */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                  zIndex: 1,
                }}
              >
                <Zoom
                  in={showText}
                  timeout={1000} //Duracion dela transición
                  style={{ transitionDelay: showText ? "0ms" : "0ms" }}
                >
                  <Box>
                    <Typography
                      variant={"h6"}
                      sx={{
                        fontWeight: "bold",

                        mb: 2,
                        color: "#e2b753",
                      }}
                    >
                      {item.text2.toUpperCase()}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        mt: 2,
                        mb: 3,
                      }}
                    >
                      {item.text1.toUpperCase()}
                    </Typography>
                    {item.component}
                  </Box>
                </Zoom>
              </div>
              {/* Efecto de desenfoque en la parte inferior */}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  width: "100%",
                  height: "500%",
                  backgroundImage:
                    "linear-gradient(to bottom, transparent, rgba(0,0,0, 0.7))",
                  transform: "translateY(-100%)",
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

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";

const CardCitaBarber = ({
  barbero,
  selectedServicio,
  onSelect,
  dataCita,
  withButtons = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setImageIndex(0);
  };

  const handleSelect = () => {
    onSelect(barbero);
    setIsSelected(true); // Marca el barbero como seleccionado
  };

  useEffect(() => {
    // Restablece el estado de isSelected cuando se cambia el barbero seleccionado
    setIsSelected(false);
  }, [barbero]);

  React.useEffect(() => {
    let interval;
    if (hovered && barbero?.imagenes.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prevIndex) =>
          prevIndex === barbero.imagenes.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hovered, barbero]);

  return (
    <Card
      sx={{
        border: isSelected ? "3px solid blue" : "none",
        backgroundColor: isSelected ? "#f0f0f0" : "transparent",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          transform: "scale(1.08)",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        alt={barbero.nombre}
        height="250"
        image={
          hovered
            ? barbero?.imagenes[imageIndex]?.url
            : barbero?.imagenes[0]?.url
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {barbero?.nombre}
        </Typography>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: 70, textAlign: "justify" }}
        >
          {barbero?.descripcion}
        </Typography> */}
      </CardContent>
      {withButtons && (
        <CardActions>
          <Button
            size="small"
            fullWidth
            onClick={handleSelect}
            sx={{
              backgroundColor: isSelected ? "blue" : "#f0f0f0",
              color: isSelected ? "white" : "black",
            }} // Cambia el color de fondo y texto si está seleccionado
          >
            {isSelected ? "SELECCIONADO" : "Seleccionar"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardCitaBarber;

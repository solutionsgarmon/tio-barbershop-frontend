import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { scrollToBottom } from "../../utils/screen";

const CardCitaBarber = ({
  barbero,
  onSelect,
  dataCita,
  withButtons = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);

  useEffect(() => {
    if (dataCita?.id_barbero == barbero._id) setIsSelected(true);
    else setIsSelected(false);
  }, [dataCita]);

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
    scrollToBottom();
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
        width: { xs: 150, sm: 220 },
        border: isSelected ? "3px solid blue" : "none",
        backgroundColor: isSelected ? "#f0f0f0" : "transparent",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          transform: "scale(1.01)",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
    >
      <CardMedia
        component="img"
        alt={barbero.nombre}
        height="300"
        image={
          hovered
            ? barbero?.imagenes[imageIndex]?.url
            : barbero?.imagenes[0]?.url
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {barbero?.nombre}
        </Typography>

        {isSelected ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left" }}
          >
            {barbero?.descripcion}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left", mx: { xs: -1, sm: 0 } }}
          >
            {barbero?.descripcion.substring(0, 70)}...
          </Typography>
        )}
      </CardContent>
      {withButtons && (
        <CardActions>
          <Button
            size="small"
            fullWidth
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

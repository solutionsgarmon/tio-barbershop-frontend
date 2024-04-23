import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";

const CardCitaBarbershop = ({
  barbershop,
  onSelect,
  dataCita,
  withButtons = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSelected, setIsSedlected] = useState(false);

  useEffect(() => {
    if (dataCita?.id_barberia == barbershop._id) setIsSedlected(true);
    else setIsSedlected(false);
  }, [dataCita]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setImageIndex(0);
  };

  const handleSelect = () => {
    onSelect(barbershop);
  };

  React.useEffect(() => {
    let interval;
    if (hovered && barbershop?.imagenes.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prevIndex) =>
          prevIndex === barbershop.imagenes.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hovered, barbershop]);

  return (
    <Card
      sx={{
        border: isSelected ? "3px solid blue" : "none",
        backgroundColor: isSelected ? "#f0f0f0" : "transparent", // Cambia el color de fondo si está seleccionado
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
        alt="green iguana"
        height="150"
        image={
          hovered
            ? barbershop?.imagenes[imageIndex]?.url
            : barbershop?.imagenes[0]?.url
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {barbershop?.nombre}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: 70, textAlign: "justify" }}
        >
          {barbershop?.descripcion}
        </Typography>
      </CardContent>
      {withButtons && (
        <CardActions>
          <Button
            size="small"
            onClick={handleSelect}
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

export default CardCitaBarbershop;

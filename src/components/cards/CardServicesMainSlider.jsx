import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";

const CardServicesMainSlider = ({
  servicio,
  onSelect,
  dataCita,
  withButtons = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    console.log("servicio._id", servicio._id);
    console.log("dataCita?.id_servicio", dataCita?.id_servicio);
    if (dataCita?.id_servicio == servicio._id) setIsSelected(true);
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
    onSelect(servicio);
  };

  React.useEffect(() => {
    let interval;
    if (hovered && servicio?.imagenes.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prevIndex) =>
          prevIndex === servicio.imagenes.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hovered, servicio]);

  return (
    <Card
      sx={{
        backgroundColor: "transparent", // Cambia el color de fondo si está seleccionado
        width: { xs: 220, sm: 310 },
      }}
    >
      <CardMedia
        component="img"
        alt="Servicios"
        height="200"
        image={
          hovered
            ? servicio?.imagenes[imageIndex]?.url
            : servicio?.imagenes[0]?.url
        }
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "white" }}
        >
          {servicio?.nombre}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          sx={{ height: 70, textAlign: "justify" }}
        >
          {servicio?.descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardServicesMainSlider;

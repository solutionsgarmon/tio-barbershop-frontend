import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardServices = ({
  servicio,
  isSelected,
  onSelect,
  withButtons = true,
}) => {
  const handleSelect = () => {
    onSelect(servicio);
  };

  return (
    <Card
      sx={{
        border: isSelected ? "3px solid blue" : "none",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          transform: "scale(1.08)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={servicio?.imagen}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {servicio?.nombre}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: 70, textAlign: "justify" }}
        >
          {servicio?.descripcion}
        </Typography>
      </CardContent>
      {withButtons && (
        <CardActions>
          <Button size="small">Detalles</Button>
          <Button size="small" onClick={handleSelect}>
            Seleccionar
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardServices;

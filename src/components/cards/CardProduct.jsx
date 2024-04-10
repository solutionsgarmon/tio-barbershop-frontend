import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Hidden,
  useMediaQuery,
} from "@mui/material";

const CardProduct = ({ producto }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const truncateDescription = (description) => {
    return description.length > 100
      ? description.slice(0, 100) + "..."
      : description;
  };
  const truncateDescriptionMovil = (description) => {
    return description.length > 60
      ? description.slice(0, 60) + "..."
      : description;
  };

  const truncateTitle = (title) => {
    return title.length > 40 ? title.slice(0, 40) + "..." : title;
  };

  const truncateTitleMovil = (title) => {
    return title.length > 30 ? title.slice(0, 30) + "..." : title;
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: { xs: 120, sm: 250 },
          height: { xs: 340, sm: 410 },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: { xs: 150, sm: 200 } }}
            image={producto.imagen}
            alt={producto.nombre}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant={isMobile ? "subtitle1" : "h6"} // Utiliza "subtitle1" para tamaños de texto más pequeños en dispositivos móviles
              component="div"
              sx={{
                textAlign: "center",
                height: 75,
                m: { xs: -1, sm: 0 },
              }}
            >
              {isMobile
                ? truncateTitleMovil(producto.nombre)
                : truncateTitle(producto.nombre)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: { xs: "left", sm: "justify" },

                m: { xs: -1, sm: 0 },
                height: { xs: 45, sm: 40 },
              }}
            >
              {isMobile
                ? truncateDescriptionMovil(producto.descripcion)
                : truncateDescription(producto.descripcion)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", margin: "auto" }}
          >
            ${producto.precio}
          </Typography>
          {/* Aquí puedes agregar cualquier otro detalle adicional, como un botón de compra */}
        </CardContent>
      </Card>
    </>
  );
};

export default CardProduct;

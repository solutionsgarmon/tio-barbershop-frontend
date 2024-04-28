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
  Stack,
} from "@mui/material";

const CardProduct = ({ producto }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const truncateDescription = (description) => {
    return description.length > 130
      ? description.slice(0, 130) + "..."
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
          backgroundColor: "#000",
          border: "1px solid #fff",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: { xs: 150, sm: 220 } }}
            image={producto.imagenes[0].url}
            alt={producto.nombre}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              component="div"
              sx={{
                textAlign: "center",
                height: { xs: 75, sm: 50 },
                m: { xs: -1, sm: 0 },
                color: "white",
              }}
            >
              <strong>
                {isMobile
                  ? truncateTitleMovil(producto.nombre)
                  : truncateTitle(producto.nombre)}
              </strong>
            </Typography>
            <Typography
              variant="body2"
              color="white"
              sx={{
                textAlign: { xs: "left", sm: "justify" },

                m: { xs: -1, sm: 0 },
                height: { xs: 46, sm: 40 },
              }}
            >
              {isMobile
                ? truncateDescriptionMovil(producto.descripcion)
                : truncateDescription(producto.descripcion)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack direction={"row"} sx={{ m: "auto" }}>
          <Typography
            variant="h5"
            color="white"
            sx={{ textAlign: "center", margin: "auto" }}
          >
            ${producto.precio}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", margin: "auto", mt: -0.2 }}
          >
            00
          </Typography>
        </Stack>
      </Card>
    </>
  );
};

export default CardProduct;

import CardProduct from "../components/cards/CardProduct";
import { Box, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Aceite para barba de montaña",
    precio: 15.99,
    imagen: "/images/producto1.PNG",
    descripcion:
      "Un aceite único y refrescante para mantener tu barba suave y saludable, con aroma a los bosques de montaña.",
  },
  {
    id: 2,
    nombre: "Cera modeladora de bigote 'Estilo Vintage'",
    precio: 9.99,
    descripcion:
      "Dale forma y estilo a tu bigote con nuestra cera modeladora de fijación fuerte, ideal para un look retro y elegante.",
    imagen: "/images/producto2.PNG",
  },
  {
    id: 3,
    nombre: "Kit de afeitado clásico",
    precio: 39.99,
    imagen: "/images/producto2.PNG",
    descripcion:
      "Un completo kit que incluye navaja de afeitar, brocha de cerdas naturales y jabón de afeitar, para una experiencia de afeitado tradicional y suave.",
  },
  {
    id: 4,
    nombre: "Loción para después del afeitado 'Refrescante Citrus'",
    precio: 12.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Una loción revitalizante con aroma cítrico para calmar la piel después del afeitado, dejándola fresca y tonificada.",
  },
  {
    id: 5,
    nombre: "Tónico capilar 'Fuerza y Vitalidad'",
    precio: 18.99,
    imagen: "/images/producto1.PNG",
    descripcion:
      "Un tónico especializado para fortalecer y estimular el crecimiento del cabello, con ingredientes naturales como extracto de ginseng y biotina.",
  },
  {
    id: 6,
    nombre: "Peine de madera para barba",
    precio: 7.49,
    imagen: "/images/producto2.PNG",
    descripcion:
      "Peine de madera hecho a mano, diseñado específicamente para desenredar y dar forma a la barba con suavidad, evitando el quiebre de los cabellos.",
  },
  {
    id: 7,
    nombre: "Aceite pre-afeitado 'Suavidad Extrema'",
    precio: 14.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un aceite pre-afeitado que suaviza y prepara la piel y la barba para un afeitado más suave y cómodo, reduciendo la irritación y los cortes.",
  },
  {
    id: 8,
    nombre: "Cepillo exfoliante facial 'Renovación Total'",
    precio: 11.99,
    imagen: "/images/producto1.PNG",
    descripcion:
      "Cepillo facial con cerdas suaves pero efectivas para limpiar en profundidad la piel, eliminando impurezas y células muertas para una apariencia fresca y renovada.",
  },
  {
    id: 9,
    nombre: "Navaja de afeitar estilo 'Barbería Clásica'",
    precio: 29.99,
    imagen: "/images/producto2.PNG",
    descripcion:
      "Navaja de afeitar de acero inoxidable con mango de madera de nogal, diseñada para ofrecer un afeitado preciso y cómodo con un toque de elegancia clásica.",
  },
  {
    id: 10,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
  {
    id: 11,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
  {
    id: 12,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
  {
    id: 13,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
  {
    id: 14,
    nombre: "Cepillo exfoliante facial 'Renovación Total'",
    precio: 11.99,
    imagen: "/images/producto1.PNG",
    descripcion:
      "Cepillo facial con cerdas suaves pero efectivas para limpiar en profundidad la piel, eliminando impurezas y células muertas para una apariencia fresca y renovada.",
  },
  {
    id: 15,
    nombre: "Navaja de afeitar estilo 'Barbería Clásica'",
    precio: 29.99,
    imagen: "/images/producto2.PNG",
    descripcion:
      "Navaja de afeitar de acero inoxidable con mango de madera de nogal, diseñada para ofrecer un afeitado preciso y cómodo con un toque de elegancia clásica.",
  },
  {
    id: 16,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
  {
    id: 17,
    nombre: "Gel para estilizar 'Control Firme'",
    precio: 8.99,
    imagen: "/images/producto3.PNG",
    descripcion:
      "Un gel de fijación fuerte para estilizar y dar forma al cabello con un control duradero, perfecto para crear peinados con precisión y definición.",
  },
];
const Tienda = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const handleChange = (event, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = PRODUCTOS.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h4" align="center">
        Tienda
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mx: 1 }}>
        <Grid container>
          {currentProducts.map((producto) => (
            <Grid key={producto.id} item xs={6} sm={6} md={4} lg={3}>
              <Box sx={{ m: { xs: 0.5, sm: 1 } }}>
                <CardProduct producto={producto} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
        spacing={2}
      >
        <Pagination
          count={Math.ceil(PRODUCTOS.length / productsPerPage)} // Calcula el número total de páginas
          page={page}
          onChange={handleChange}
          sx={{ textAlign: "center", margin: "auto" }}
        />
      </Stack>
    </div>
  );
};

export default Tienda;

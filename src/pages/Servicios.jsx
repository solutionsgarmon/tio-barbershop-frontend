import { Box, Button } from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";

import { useState } from "react";
import MapFrame from "../components/atoms/MapFrame";
import { useEffect } from "react";
import { getServices } from "../api/gets";
const SERVICIOS = [
  {
    id: 1,
    nombre: "Corte de Cabello",
    precio: 100,
    descripcion:
      "Servicio de estilismo en el que se corta y/o peina el cabello según las preferencias del cliente.",
    imagen: "/images/servicios/servicios1.png",
  },
  {
    id: 2,
    nombre: "Afeitado Clásico",
    precio: 100,
    descripcion:
      "Servicio de afeitado facial que sigue técnicas tradicionales, que incluye el uso de navajas de afeitar y productos de afeitado de alta calidad.",
    imagen: "/images/servicios/servicios2.png",
  },
  {
    id: 3,
    nombre: "Afeitado Deluxe",
    precio: 200,
    descripcion:
      "Servicio de afeitado premium que ofrece una experiencia de afeitado de lujo, con características adicionales como masajes faciales, productos especiales para la piel.",
    imagen: "/images/servicios/servicios3.png",
  },
  {
    id: 4,
    nombre: "Paquete Clásico",
    precio: 250,
    descripcion:
      "Paquete que combina servicios básicos de estilismo y aseo personal, como corte de cabello y afeitado clásico, ofreciendo un valor agregado a un precio conveniente.",
    imagen: "/images/servicios/servicios4.png",
  },
  {
    id: 5,
    nombre: "Servicio Premium",
    precio: 300,
    descripcion:
      "Un servicio exclusivo y personalizado que puede incluir una variedad de tratamientos de belleza y cuidado personal, adaptados a las necesidades individuales y utilizando productos de alta gama.",
    imagen: "/images/servicios/servicios5.png",
  },
  {
    id: 6,
    nombre: "Todo incluido",
    precio: 350,
    descripcion:
      "Paquete completo que abarca una amplia gama de servicios de estilismo y cuidado personal, desde cortes de cabello y afeitados hasta tratamientos faciales y masajes.",
    imagen: "/images/servicios/servicios6.png",
  },
];

const Servicios = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setServices(await getServices());
    }

    fetchData();
  }, []);

  return (
    <Box>
      <h1>Servicios que Ofrecemos</h1>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {services?.map((servicio) => (
          <Box sx={{ m: 2, maxWidth: 500 }}>
            <CardServices servicio={servicio} withButtons={false} />
          </Box>
        ))}
      </Box>
      <MapFrame />
    </Box>
  );
};

export default Servicios;

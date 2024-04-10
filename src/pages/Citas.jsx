import { Box, Button } from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";
import CitasConfirmacion from "../views/CitasConfirmacion";
import CitasSeleccionBarberia from "../views/CitasSeleccionBarberia";
import { useState } from "react";
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

const Citas = () => {
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Haz una Cita", "Selección de Barbería", "Confirmación"];

  const handleSelect = (servicio) => {
    setSelectedServicio(servicio);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Box>
      <h1>{steps[currentStep]}</h1>
      {currentStep === 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {SERVICIOS?.map(
            (servicio, index) =>
              index % 2 === 0 && (
                <React.Fragment key={servicio.id}>
                  <Box sx={{ m: 1, maxWidth: 350 }}>
                    <CardServices
                      servicio={servicio}
                      isSelected={selectedServicio === servicio}
                      onSelect={handleSelect}
                    />
                  </Box>
                  {index + 1 < SERVICIOS.length && (
                    <Box sx={{ m: 1, maxWidth: 350 }}>
                      <CardServices
                        servicio={SERVICIOS[index + 1]}
                        isSelected={selectedServicio === SERVICIOS[index + 1]}
                        onSelect={handleSelect}
                      />
                    </Box>
                  )}
                </React.Fragment>
              )
          )}
        </Box>
      )}
      {currentStep !== 0 && (
        <Box sx={{ mt: 2 }}>
          {currentStep === 1 && <CitasSeleccionBarberia />}
          {currentStep === 2 && <CitasConfirmacion />}
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {currentStep !== 0 && (
          <Button disabled={!selectedServicio} onClick={handleBack}>
            Regresar
          </Button>
        )}

        <Button
          variant="contained"
          disabled={!selectedServicio}
          onClick={handleContinue}
        >
          {currentStep === steps.length - 1 ? "Finalizar" : "Continuar"}
        </Button>
      </Box>
    </Box>
  );
};

export default Citas;

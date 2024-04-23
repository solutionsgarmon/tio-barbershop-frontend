import { Box, Button, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";
import CitasConfirmacion from "../views/CitasConfirmacion";

import { useState } from "react";
import Stepper from "../components/molecules/Stepper";
import { useEffect } from "react";
import { getBarbers, getBarbershops, getServices } from "../api/gets";
import { useAppContext } from "../context/AppProvider";
import CitasSeleccionBarbero from "../views/CitasSeleccionBarbero";
import CitasSeleccionServicio from "../views/CitasSeleccionServicio";
import CitasSeleccionHora from "../views/CitasSeleccionHora";
import CitasDatosCliente from "../views/CitasDatosCliente";
import CardCitaBarbershop from "../components/cards/CardCitaBarbershop";

const STEPS = ["Barbería", "Barbero", "Servicio", "Hora", "Confirmación"];
const STEPS_DESC = [
  "Sucursal ",
  "Barbero favorito",
  "Servicio",
  "Fecha y Hora",
  "Confirmación",
];

const Citas = () => {
  const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [dataCita, setDataCita] = useState({
    barberia: "",
    id_barberia: "",
    servicio: "",
    id_servicio: "",
    costo: "",
    duracion: "",
    barbero: "",
    id_barbero: "",
    imagen_barbero: "",
    hora: "",
    fecha: "",
    nombre_cliente: "",
    telefono_cliente: "",
    correo_cliente: "",
  });
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [barbershopSelected, setBarbershopSelected] = useState(null);
  const [enableButton, setEnableButton] = useState(false);

  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    if (sessionDataStorage?.rol === "BARBERO") {
      const barberiaAsignada = sessionDataStorage.barberia_asignada;
      const nombreBarberia =
        barbershops.find((barbershop) => barbershop._id === barberiaAsignada)
          ?.nombre ?? "";
      setDataCita((prevDataCita) => ({
        ...prevDataCita,
        barberia: nombreBarberia,
        id_barberia: barberiaAsignada,
        barbero: sessionDataStorage.nombre,
        id_barbero: sessionDataStorage._id,
        imagen_barbero: sessionDataStorage.imagenes?.[0]?.url ?? "",
      }));
      setCurrentStep(2);
    }
  }, [sessionDataStorage, barbershops]);

  useEffect(() => {
    console.log("dataCita", dataCita);
  }, [dataCita]);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingApp(true);
      setBarbershops(await getBarbershops());
      setBarbers(await getBarbers());
      setServices(await getServices());
      // setProducts(await getProducts());
      setIsLoadingApp(false); // Mover aquí para que se establezca en false después de obtener los datos
    }

    fetchData();
    setBarbershopSelected(null);
  }, [reloadData]);

  const handleSelectBarbershop = (barberia) => {
    setDataCita((prevDataCita) => ({
      ...prevDataCita,
      barberia: barberia.nombre,
      id_barberia: barberia._id,
    }));
    setEnableButton(true);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
    setEnableButton(false);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Box
      sx={{ m: "auto", minHeight: "85vh", maxWidth: 800, textAlign: "center" }}
    >
      {/* <h1>{STEPS_DESC[currentStep]}</h1> */}
      <Paper sx={{ pt: 2, pb: 1, mt: { xs: -1.5, sm: 1 } }}>
        <Stepper steps={STEPS} currenStep={currentStep} />
      </Paper>
      {isLoadingApp ? (
        <>
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Skeleton variant="text" width={350} height={350} sx={{ mx: 2 }} />
            <Skeleton variant="text" width={350} height={350} sx={{ mx: 2 }} />
            <Skeleton variant="text" width={350} height={350} sx={{ mx: 2 }} />
          </Stack>
        </>
      ) : (
        <>
          {currentStep === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {barbershops?.map(
                (element, index) =>
                  index % 2 === 0 && (
                    <React.Fragment key={element.id}>
                      <Box sx={{ m: 1, maxWidth: 350 }}>
                        <CardCitaBarbershop
                          barbershop={element}
                          onSelect={handleSelectBarbershop}
                          dataCita={dataCita}
                        />
                      </Box>
                      {index + 1 < barbershops.length && (
                        <Box sx={{ m: 1, maxWidth: 350 }}>
                          <CardCitaBarbershop
                            barbershop={barbershops[index + 1]}
                            onSelect={handleSelectBarbershop}
                            dataCita={dataCita}
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
              {currentStep === 1 && (
                <CitasSeleccionBarbero
                  dataCita={dataCita}
                  setEnableButton={setEnableButton}
                  setDataCita={setDataCita}
                  barbers={barbers}
                />
              )}
              {currentStep === 2 && (
                <CitasSeleccionServicio
                  services={services}
                  dataCita={dataCita}
                  setEnableButton={setEnableButton}
                  setDataCita={setDataCita}
                />
              )}
              {currentStep === 3 && (
                <CitasSeleccionHora
                  setEnableButton={setEnableButton}
                  setDataCita={setDataCita}
                  dataCita={dataCita}
                />
              )}

              {currentStep === 4 && (
                <CitasConfirmacion
                  setEnableButton={setEnableButton}
                  setDataCita={setDataCita}
                  dataCita={dataCita}
                />
              )}
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            {currentStep !== 0 && (
              <Button onClick={handleBack}>Regresar</Button>
            )}
            {currentStep === STEPS.length - 1 ? null : (
              <Button
                variant="contained"
                disabled={!enableButton}
                onClick={handleContinue}
              >
                Continuar
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Citas;

import {
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import React from "react";
import CardServices from "../components/cards/CardServices";
import CitasConfirmacion from "../views/CitasConfirmacion";
import SendIcon from "@mui/icons-material/Send";

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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const STEPS = ["Barbería", "Barbero", "Servicio", "Hora", "Confirmación"];
const STEPS_DESC = [
  "Sucursal ",
  "Barbero favorito",
  "Servicio",
  "Fecha y Hora",
  "Confirmación",
];
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
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
    imagen_cliente: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [confirmacion, setConfirmacion] = useState(false);

  const [enableButton, setEnableButton] = useState(false);

  //Iniciliazar informacion de la cita dependiendo del ROL
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
    } else if (sessionDataStorage?.rol == "CLIENTE") {
      setDataCita((prevData) => ({
        ...prevData,
        nombre_cliente: sessionDataStorage.nombre || "",
        telefono_cliente: sessionDataStorage.telefono || "",
        correo_cliente: sessionDataStorage.correo || "",
        imagen_cliente: sessionDataStorage.imagen || "",
      }));
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
      setIsLoadingApp(false);
    }

    fetchData();
  }, []);

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
    //scrollToTop();
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Box
      sx={{
        m: "auto",
        minHeight: "85vh",
        maxWidth: 1000,
        textAlign: "center",
        mt: 4,
      }}
    >
      {/* <h1>{STEPS_DESC[currentStep]}</h1> */}
      <Paper sx={{ pt: 2, pb: 1, mt: { xs: -1.5, sm: 1 } }}>
        <Stepper steps={STEPS} currenStep={currentStep} />
        {!sessionDataStorage && (
          <Alert variant="filled" severity="warning" sx={{ mt: 1, mx: 1 }}>
            <Typography>
              <strong>
                Usted no está autenticado, aún así su cita si se guardará, si
                desea consultarla o modificarla deberá crear una cuenta con el
                e-mail registrado en el formulario.
              </strong>
            </Typography>
          </Alert>
        )}
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
                  confirmacion={confirmacion}
                  setConfirmacion={setConfirmacion}
                />
              )}
            </Box>
          )}
          <Stack
            onClick={scrollToTop}
            direction={"row"}
            sx={{
              textAlign: "center",
              mt: 5,
              mx: { xs: 2, sm: 10 },
            }}
          >
            {currentStep !== 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ px: { xs: 3, sm: 10 } }}
              >
                <ArrowBackIcon />
                &nbsp;Atrás
              </Button>
            )}
            {currentStep === STEPS.length - 1 ? (
              <Button
                variant="contained"
                onClick={(event) => {
                  setConfirmacion(true);
                  event.stopPropagation();
                }}
                fullWidth
                sx={{ py: 1, ml: 1 }}
              >
                Confirmar cita &nbsp; <SendIcon />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleContinue}
                disabled={!enableButton}
                fullWidth
                sx={{ py: 1, ml: 1 }}
              >
                Siguiente Paso &nbsp; <ArrowForwardIcon />
              </Button>
              // <button
              //   style={{
              //     display: "inline-block",
              //     backgroundColor: "#E2b753 ",
              //     color: "white",
              //     border: "none",
              //     padding: "10px 20px",
              //     fontSize: "16px",
              //     borderRadius: "4px",
              //     cursor: "pointer",
              //     outline: "none",
              //     width: "100%",
              //     marginLeft: "10px",
              //   }}
              //   onClick={handleContinue}
              //   disabled={!enableButton}
              // >
              //   Siguiente Paso <ArrowForwardIcon sx={{ mb: -0.8 }} />
              // </button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Citas;

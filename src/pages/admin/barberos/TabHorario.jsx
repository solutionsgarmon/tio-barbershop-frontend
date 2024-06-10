import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AlertWarning from "../../../components/messages/AlertWarning";
import { toast } from "react-toastify";
import { updateBarber, updateBarbershop } from "../../../api/updates";
import { useAppContext } from "../../../context/AppProvider";
import { useEffect } from "react";

const TabHorario = ({ barberSelected, setReloadData, setIndexTabSelected }) => {
  const { setIsLoadingApp } = useAppContext();
  const [barbershopSelected, setBarbershopSelected] = useState("");
  const [horario, setHorario] = useState({
    lunes: { trabaja: "", hora_inicio: "", hora_fin: "" },
    martes: { trabaja: "", hora_inicio: "", hora_fin: "" },
    miercoles: { trabaja: "", hora_inicio: "", hora_fin: "" },
    jueves: { trabaja: "", hora_inicio: "", hora_fin: "" },
    viernes: { trabaja: "", hora_inicio: "", hora_fin: "" },
    sabado: { trabaja: "", hora_inicio: "", hora_fin: "" },
    domingo: { trabaja: "", hora_inicio: "", hora_fin: "" },
  });

  useEffect(() => {
    if (barberSelected?.barberias_asignadas.length > 0)
      setBarbershopSelected(barberSelected?.barberias_asignadas[0]?.idBarberia);
  }, []);

  useEffect(() => {
    if (barbershopSelected != "" && barberSelected) {
      const barberiaSeleccionada = barberSelected.barberias_asignadas.find(
        (barberiaAsigada) => barberiaAsigada.idBarberia == barbershopSelected
      );
      setHorario(barberiaSeleccionada.horario);
    }
  }, [barbershopSelected]);

  const handleHorarioChange = (day, field, value) => {
    if (field === "trabaja") {
      if (value === "N") {
        setHorario((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            [field]: value,
            hora_inicio: "",
            hora_fin: "",
          },
        }));
      } else {
        setHorario((prev) => ({
          ...prev,
          [day]: { ...prev[day], [field]: value },
        }));
      }
    } else {
      setHorario((prev) => ({
        ...prev,
        [day]: { ...prev[day], [field]: value },
      }));
    }
  };

  const handleChangeSelect = (event) => {
    setBarbershopSelected(event.target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();
    let isValid = true;
    let modifiedHorario = {};

    for (const [day, time] of Object.entries(horario)) {
      if (
        time.hora_inicio !== "" &&
        time.hora_fin !== "" &&
        time.trabaja == "S"
      ) {
        modifiedHorario[day] = {
          ...time, // Conserva las propiedades existentes
          trabaja: "S", // Modifica la propiedad "trabaja"
          hora_inicio: time.hora_inicio,
          hora_fin: time.hora_fin,
        };
      } else {
        modifiedHorario[day] = {
          ...time, // Conserva las propiedades existentes
          trabaja: "N", // Modifica la propiedad "trabaja"
          hora_inicio: "",
          hora_fin: "",
        };
      }
    }

    console.log("modifiedHorario", modifiedHorario);

    // Iterar sobre los horarios para validar
    Object.entries(modifiedHorario).forEach(([day, time]) => {
      if (time.hora_inicio && time.hora_fin) {
        const hora_inicio = new Date(`01/01/2000 ${time.hora_inicio}`);
        const hora_fin = new Date(`01/01/2000 ${time.hora_fin}`);

        if (hora_inicio >= hora_fin) {
          toast.error(
            `Horario inválido para ${day}: La hora de INICIO debe ser anterior a la hora FIN.`
          );
          isValid = false;
        }
      }
    });

    // Si todos los horarios son válidos, guardar...
    if (isValid) {
      console.log("modifiedHorario", modifiedHorario);
      handleUpdate(modifiedHorario);
      setIndexTabSelected(0);
      toast.success(`Horario guardado correctamente.`);
    }
  };

  // UPDATE ACTION //
  const handleUpdate = async (values) => {
    setIsLoadingApp(true);
    const id = barberSelected._id;
    // console.log("values", values, id);

    let clonacionBarberiasAsignadas = [...barberSelected.barberias_asignadas];
    // console.log("clonacionBarberiasAsignadas", clonacionBarberiasAsignadas);
    const indexUpdate = clonacionBarberiasAsignadas.findIndex(
      (barberiaAsignada) => {
        return barberiaAsignada.idBarberia === barbershopSelected;
      }
    );
    clonacionBarberiasAsignadas[indexUpdate].horario = values;
    const newHorario = { barberias_asignadas: clonacionBarberiasAsignadas };
    try {
      // console.log("clonacionBarberiasAsignadas", clonacionBarberiasAsignadas);
      const resp = await updateBarber(newHorario, id);
      if (resp.data.success) {
        toast.success("Se modificó correctamente.");
        await setReloadData((prev) => !prev);
      } else {
        toast.error("No se pudo modificar.");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      toast.error("Error al modificar.");
    }
    setIsLoadingApp(false);
  };

  return (
    <div>
      {barberSelected && barberSelected?.barberias_asignadas.length > 0 ? (
        <div>
          <Stack direction={"row"} sx={{ mb: 1 }}>
            <Typography variant="h5" gutterBottom>
              Horario del Barbero [{barberSelected.nombre}]
            </Typography>{" "}
            <Avatar src={barberSelected?.imagenes[0].url} sx={{ ml: 1 }} />
          </Stack>
          <form onSubmit={handleSubmit}>
            <Paper sx={{ mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Selecciona una barbería
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={barbershopSelected}
                  label=" Selecciona una barbería"
                  onChange={handleChangeSelect}
                >
                  {barberSelected?.barberias_asignadas.map((barberia) => (
                    <MenuItem value={barberia.idBarberia}>
                      {barberia.nombreBarberia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
            <Paper elevation={3} style={{ width: "fit-content", padding: 20 }}>
              <Grid container spacing={2} justifyContent="center">
                {Object.keys(horario).map((day) => (
                  <Grid item xs={12} key={day}>
                    <FormControl fullWidth>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={horario[day].trabaja === "S"}
                              onChange={(e) =>
                                handleHorarioChange(
                                  day,
                                  "trabaja",
                                  e.target.checked ? "S" : "N"
                                )
                              }
                            />
                          }
                          label={day.charAt(0).toUpperCase() + day.slice(1)}
                        />
                        {horario[day].trabaja === "S" && (
                          <Stack direction={"row"}>
                            <TextField
                              sx={{ width: 150, mr: 2 }}
                              label={`Inicio para ${day}`}
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 minutos
                              }}
                              value={horario[day].hora_inicio}
                              onChange={(e) =>
                                handleHorarioChange(
                                  day,
                                  "hora_inicio",
                                  e.target.value
                                )
                              }
                            />
                            <TextField
                              sx={{ width: 150 }}
                              label={`Fin para ${day}`}
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 minutos
                              }}
                              value={horario[day].hora_fin}
                              onChange={(e) =>
                                handleHorarioChange(
                                  day,
                                  "hora_fin",
                                  e.target.value
                                )
                              }
                            />
                          </Stack>
                        )}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: 20 }}
              fullWidth
            >
              Guardar Horarios
            </Button>
          </form>
        </div>
      ) : (
        <AlertWarning
          text={
            "Debe seleccionar un barbero y este debe tener al menos una barbería asignada."
          }
        />
      )}
    </div>
  );
};

export default TabHorario;

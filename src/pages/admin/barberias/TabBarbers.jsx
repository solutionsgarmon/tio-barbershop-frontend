import React, { useEffect } from "react";
import MyTransferList from "../../../components/molecules/MyTransferList";
import AlertWarning from "../../../components/messages/AlertWarning";
import { updateBarber, updateBarbershop } from "../../../api/updates";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppProvider";

const TabBarbers = ({ barbershopSelected, barbers, setReloadData }) => {
  const { setIsLoadingApp } = useAppContext();
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    // Verificar que se ha seleccionado una barbería y que hay barberos disponibles
    if (barbershopSelected && barbers.length > 0) {
      const barberosAsignados = barbershopSelected.barberos;
      console.log("barberosAsignados", barberosAsignados);
      console.log("Todos los barberos", barbers);

      // Filtrar los barberos totales para encontrar los no asignados
      const barberosNoAsignados = barbers.filter(
        (barber) =>
          !barberosAsignados.some((asignado) => asignado._id === barber._id)
      );

      setLeft(barberosAsignados);
      setRight(barberosNoAsignados);
    }
  }, [barbershopSelected, barbers]);

  const handleSave = async () => {
    setIsLoadingApp(true);
    const newBarberosAsignados = left;
    const newBarberosNoAsignados = right;
    const idBarbershop = barbershopSelected._id;
    console.log("newBarberosAsignados", newBarberosAsignados);
    console.log("newBarberosNoAsignados", newBarberosNoAsignados);
    console.log("id barberia", idBarbershop);

    //Modificar subdocumento barberos de BARBERIA seleccionada
    const values = { barberos: newBarberosAsignados };
    const resp = await updateBarbershop(values, idBarbershop);

    //**** Modificar propiedad de barberias_asignadas a todos los barberos asignados*****
    const promises1 = [];
    for (let i = 0; i < newBarberosAsignados.length; i++) {
      const barbero = newBarberosAsignados[i];

      const barberiaEncontrada = barbero.barberias_asignadas.find(
        (barberiaAsignada) =>
          barberiaAsignada.idBarberia === barbershopSelected._id
      );
      let values;
      if (barberiaEncontrada) {
        //Si ya lo tiene, no hagas nada
        promises1.push(null);
      } else {
        //Si no tiene, modifica la estructura del barbero.barberias_asiganadas haciendo un push()
        let clonacionBarberiasAsignadas = [...barbero.barberias_asignadas];
        // Buscar en el arreglo si no tiene la barbería, hacerle un push
        clonacionBarberiasAsignadas.push({
          idBarberia: barbershopSelected._id,
          nombreBarberia: barbershopSelected.nombre,
          horario: {
            domingo: "",
            lunes: "",
            martes: "",
            miercoles: "",
            jueves: "",
            viernes: "",
            sabado: "",
          },
        });
        values = { barberias_asignadas: clonacionBarberiasAsignadas };
        promises1.push(updateBarber(values, barbero._id));
      }
    }

    //**** Modificar propiedad de barberias_asignadas a todos los barberos no asignados*****
    const promises2 = [];
    for (let i = 0; i < newBarberosNoAsignados.length; i++) {
      const barbero = newBarberosNoAsignados[i];

      const barberiaEncontrada = barbero.barberias_asignadas.find(
        (barberiaAsignada) =>
          barberiaAsignada.idBarberia === barbershopSelected._id
      );
      let values;
      if (barberiaEncontrada) {
        //Si ya lo tiene, borralo
        let clonacionBarberiasAsignadas = [...barbero.barberias_asignadas];
        clonacionBarberiasAsignadas = clonacionBarberiasAsignadas.filter(
          (barberiaAsignada) =>
            barberiaAsignada.idBarberia != barbershopSelected._id
        );
        values = { barberias_asignadas: clonacionBarberiasAsignadas };
        promises2.push(updateBarber(values, barbero._id));
      } else {
        //Si no tiene, no hagas nada
        promises2.push(null);
      }
    }

    ///////// Esperar a que todas las actualizaciones se completen////////
    const resultados = await Promise.allSettled([...promises1, ...promises2]);

    // Verificar si todas las actualizaciones fueron exitosas
    const todasExitosas = resultados.every(
      (resultado) => resultado.status === "fulfilled"
    );

    if (todasExitosas) {
      toast.success("Asignación Exitosa");
      console.log("Todas las actualizaciones se realizaron correctamente.");
    } else {
      toast.error(" Hubo un problema al realizar la asignación");
      console.log(
        "Al menos una actualización falló. Revisa los resultados para más detalles."
      );
    }
    setReloadData((prev) => !prev);
    setIsLoadingApp(false);
  };

  return (
    <div>
      {barbershopSelected !== null ? (
        <MyTransferList
          left={left}
          right={right}
          setLeft={setLeft}
          setRight={setRight}
          titleLeft={"Barberos Asignados"}
          titleRight={"Barberos Disponibles"}
          handleSave={handleSave}
        />
      ) : (
        <AlertWarning
          text={
            "Debe seleccionar una Barbería para modificar los Barberos Asignados"
          }
        />
      )}
    </div>
  );
};

export default TabBarbers;

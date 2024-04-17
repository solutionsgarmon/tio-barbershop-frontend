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
    //Crear lado izquierda y lado derecho
    if (barbershopSelected) {
      const barberosAsignados = barbershopSelected.barberos;
      console.log("barberosAsignados", barberosAsignados);
      console.log("Todos los barberos", barbers);

      const barberosNoAsignados = barbers.filter(
        (barber) => barber.barberia_asignada === ""
      );

      setLeft(barberosAsignados);
      setRight(barberosNoAsignados);
    }
  }, []);

  const handleSave = async () => {
    setIsLoadingApp(true);
    const newBarberosAsignados = left;
    const newBarberosNoAsignados = right;
    const idBarbershop = barbershopSelected._id;
    console.log("newBarberosAsignados", newBarberosAsignados);
    console.log("newBarberosNoAsignados", newBarberosNoAsignados);
    console.log("id barberia", idBarbershop);

    //Modificar subdocumento barberos de barberia seleccionada
    const values = { barberos: newBarberosAsignados };
    const resp = await updateBarbershop(values, idBarbershop);

    // Modificar propiedad de barberia_asignada a todos los barberos asignados
    const promises1 = newBarberosAsignados.map(async (barbero) => {
      const values = { barberia_asignada: idBarbershop };
      return updateBarber(values, barbero._id);
    });

    // Modificar propiedad de barberia_asignada a todos los barberos no asignados
    const promises2 = newBarberosNoAsignados.map(async (barbero) => {
      const values = { barberia_asignada: "" };
      return updateBarber(values, barbero._id);
    });

    // Esperar a que todas las actualizaciones se completen
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

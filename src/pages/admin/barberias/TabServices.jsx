//NO SE OCUPA ESTA POR QUE TODOS LOS BARBEROS SABEN TODO
import React, { useEffect } from "react";
import MyTransferList from "../../../components/molecules/MyTransferList";
import AlertWarning from "../../../components/messages/AlertWarning";
import { updateBarber, updateBarbershop } from "../../../api/updates";
import { toast } from "react-toastify";

const TabServices = ({ barbershopSelected, services, setReloadData }) => {
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    //Crear lado izquierda y lado derecho
    if (barbershopSelected) {
      const serviciosAsignados = barbershopSelected.servicios;
      console.log("serviciosAsignados", serviciosAsignados);
      console.log("Todos los servicios", services);

      //Obtener un arreglo con los IDs asignados
      const serviciosAsignadosIds = serviciosAsignados.map(
        (servicio) => servicio._id
      );

      //Obtener la lista de los que no estan asignados
      const serviciosNoAsignados = services.filter(
        (servicio) => !serviciosAsignadosIds.includes(servicio.id)
      );

      console.log("Servicios no asignados", serviciosNoAsignados);
      setLeft(serviciosAsignados);
      setRight(serviciosNoAsignados);
    }
  }, []);

  // const handleSave = async () => {
  //   const newServiciosAsignados = left;
  //   const newServiciosNoAsignados = right;
  //   const idBarbershop = barbershopSelected._id;
  //   console.log("newServiciosAsignados", newServiciosAsignados);
  //   console.log("newServiciosNoAsignados", newServiciosNoAsignados);
  //   console.log("id barberia", idBarbershop);

  //   //Modificar subdocumento servicios de barberia seleccionada
  //   const values = { servicios: newServiciosAsignados };
  //   const resp = await updateBarbershop(values, idBarbershop);

  //   // Modificar propiedad de barberia_asignada a todos los servicios asignados
  //   const promises1 = newServiciosAsignados.map(async (barbero) => {
  //     const values = { barberia_asignada: idBarbershop };
  //     return updateBarber(values, barbero._id);
  //   });

  //   // Modificar propiedad de barberia_asignada a todos los servicios no asignados
  //   const promises2 = newServiciosNoAsignados.map(async (barbero) => {
  //     const values = { barberia_asignada: "" };
  //     return updateBarber(values, barbero._id);
  //   });

  //   // Esperar a que todas las actualizaciones se completen
  //   const resultados = await Promise.allSettled([...promises1, ...promises2]);

  //   // Verificar si todas las actualizaciones fueron exitosas
  //   const todasExitosas = resultados.every(
  //     (resultado) => resultado.status === "fulfilled"
  //   );

  //   if (todasExitosas) {
  //     toast.success("Asignación Exitosa");
  //     console.log("Todas las actualizaciones se realizaron correctamente.");
  //   } else {
  //     toast.error(" Hubo un problema al realizar la asignación");
  //     console.log(
  //       "Al menos una actualización falló. Revisa los resultados para más detalles."
  //     );
  //   }
  //   setReloadData((prev) => !prev);
  // };

  return (
    <div>
      {barbershopSelected !== null ? (
        <MyTransferList
          left={left}
          right={right}
          setLeft={setLeft}
          setRight={setRight}
          titleLeft={"Servicios Asignados"}
          titleRight={"Servicios Disponibles"}
          handleSave={handleSave}
        />
      ) : (
        <AlertWarning
          text={
            "Debe seleccionar una Barbería para modificar los Servicios Asignados"
          }
        />
      )}
    </div>
  );
};

export default TabServices;

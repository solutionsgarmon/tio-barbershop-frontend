import React, { useEffect } from "react";
import MyTransferList from "../../../components/molecules/MyTransferList";
import AlertWarning from "../../../components/messages/AlertWarning";
import {
  updateBarber,
  updateBarbershop,
  updateProduct,
} from "../../../api/updates";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppProvider";

const TabProducts = ({ barbershopSelected, products, setReloadData }) => {
  const { setIsLoadingApp } = useAppContext();
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    //Crear lado izquierda y lado derecho
    if (barbershopSelected) {
      const productosAsignados = barbershopSelected.productos;
      console.log("productosAsignados", productosAsignados);
      console.log("Todos los productos", products);

      //Obtener un arreglo con los IDs asignados
      const productosAsignadosIds = productosAsignados.map(
        (producto) => producto._id
      );

      //Obtener la lista de los que no estan asignados
      const productosNoAsignados = products.filter(
        (producto) => !productosAsignadosIds.includes(producto._id)
      );

      setLeft(productosAsignados);
      setRight(productosNoAsignados);
    }
  }, []);

  const handleSave = async () => {
    setIsLoadingApp(true);
    const newProductosAsignados = left;
    const newProductosNoAsignados = right;
    const idBarbershop = barbershopSelected._id;
    console.log("newProductosAsignados", newProductosAsignados);
    console.log("newProductosNoAsignados", newProductosNoAsignados);
    console.log("id barberia", idBarbershop);

    //Modificar subdocumento productos de barberia seleccionada
    const values = { productos: newProductosAsignados };
    const resp = await updateBarbershop(values, idBarbershop);

    // Modificar propiedad de barberias_asignadas a todos los productos asignados
    const promises1 = newProductosAsignados.map(async (producto) => {
      const values = { barberias_asignadas: idBarbershop };
      return updateProduct(values, producto._id);
    });

    // Esperar a que todas las actualizaciones se completen
    const resultados = await Promise.allSettled([...promises1]);

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
          titleLeft={"Productos Asignados"}
          titleRight={"Productos Disponibles"}
          handleSave={handleSave}
        />
      ) : (
        <AlertWarning
          text={
            "Debe seleccionar una Barbería para modificar los Productos Asignados"
          }
        />
      )}
    </div>
  );
};

export default TabProducts;

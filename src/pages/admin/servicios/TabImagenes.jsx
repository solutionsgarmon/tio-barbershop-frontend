import React, { useEffect, useState } from "react";

import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";
import appFirebase from "../../../../credencialesFireStore";
import { v4 as genID } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppContext } from "../../../context/AppProvider";
import { toast } from "react-toastify";
import { updateBarbershop, updateService } from "../../../api/updates";

const TabImagenes = ({ serviceSelected }) => {
  const { setIsLoadingApp } = useAppContext();
  const storage = getStorage(appFirebase);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (serviceSelected) {
      console.log("Cambió serviceSelected", serviceSelected);
      setImagenes(serviceSelected.imagenes);
    }
  }, []);

  const handleSubirImagen = async (file) => {
    setIsLoadingApp(true);
    try {
      const dataImgUp = await uploadImageFirestore(file);
      serviceSelected.imagenes.push(dataImgUp);
      const newValues = { imagenes: serviceSelected.imagenes };
      await updateService(newValues, serviceSelected._id);
      toast.success("Imagen agregada exitosamente.");
    } catch (error) {
      toast.error("Error al subir imagen.");
      console.error(error);
    }
    setIsLoadingApp(false);
  };

  const uploadImageFirestore = async (file) => {
    try {
      const id = genID();
      const extension = file.name.split(".").pop();
      const pathImg = `services/${id}.${extension}`;
      const refArchivo = ref(storage, pathImg);

      // Subir imagen a Firestore
      await uploadBytes(refArchivo, file);
      const urlImg = await getDownloadURL(refArchivo);
      return {
        url: urlImg,
        id: id,
        path: pathImg,
      };
    } catch (error) {
      console.error("Error en: uploadImageFirestore()", error);
      throw new Error("Error al subir la imagen a Firebase Storage");
    }
  };

  const handleEliminarImagen = async (dataImagen) => {
    try {
      const newImages = imagenes.filter(
        (imagen) => dataImagen.id !== imagen.id
      );
      const newValues = { imagenes: newImages };
      await updateBarbershop(newValues, serviceSelected._id);

      setImagenes(newImages);
      toast.success("Imagen Eliminada");
    } catch (e) {
      console.log("error en handleEliminarImagen()", e);
      toast.error("No se pudo Eliminar ");
    }
  };

  return (
    <div>
      {serviceSelected !== null ? (
        <ImagesContainer
          imagenes={imagenes}
          handleSubirImagen={handleSubirImagen}
          handleEliminarImagen={handleEliminarImagen}
        />
      ) : (
        <AlertWarning
          text={"Debe seleccionar un servicio para modificar sus Imágenes"}
        />
      )}
    </div>
  );
};

export default TabImagenes;

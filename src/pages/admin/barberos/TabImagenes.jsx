import React, { useEffect, useState } from "react";

import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";
import appFirebase from "../../../../credencialesFireStore";
import { getFromLocalStorage } from "../../../helpers/localStorageHelper";
import { v4 as genID } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateBarber } from "../../../api/updates";
import { useAppContext } from "../../../context/AppProvider";
import { toast } from "react-toastify";

const TabImagenes = ({ barberSelected }) => {
  const { setIsLoadingApp } = useAppContext();
  const storage = getStorage(appFirebase);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (barberSelected) {
      console.log("Cambió barberSelected", barberSelected);
      setImagenes(barberSelected.imagenes);
    }
  }, []);

  const handleSubirImagen = async (file) => {
    setIsLoadingApp(true);
    try {
      const dataImgUp = await uploadImageFirestore(file);
      barberSelected.imagenes.push(dataImgUp);
      const newValues = { imagenes: barberSelected.imagenes };
      await updateBarber(newValues, barberSelected._id);
      // setImagenes([...imagenes, dataImgUp]);
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
      const pathImg = `barbers/${id}.${extension}`;
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
      await updateBarber(newValues, barberSelected._id);

      setImagenes(newImages);
      toast.success("Imagen Eliminada");
    } catch (e) {
      console.log("error en handleEliminarImagen()", e);
      toast.error("No se pudo Eliminar ");
    }
  };

  return (
    <div>
      {barberSelected !== null ? (
        <ImagesContainer
          imagenes={imagenes}
          handleSubirImagen={handleSubirImagen}
          handleEliminarImagen={handleEliminarImagen}
        />
      ) : (
        <AlertWarning
          text={"Debe seleccionar un barbero para modificar sus Imágenes"}
        />
      )}
    </div>
  );
};

export default TabImagenes;

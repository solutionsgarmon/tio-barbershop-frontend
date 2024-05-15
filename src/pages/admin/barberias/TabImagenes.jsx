import React, { useEffect, useState } from "react";

import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";
import appFirebase from "../../../../credencialesFireStore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as genID } from "uuid";
import { useAppContext } from "../../../context/AppProvider";
import { toast } from "react-toastify";
import { updateBarbershop } from "../../../api/updates";

const TabImagenes = ({ barbershopSelected }) => {
  const { setIsLoadingApp } = useAppContext();
  const storage = getStorage(appFirebase);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (barbershopSelected) {
      console.log("Cambió barbershopSelected", barbershopSelected);
      setImagenes(barbershopSelected.imagenes);
    }
  }, []);

  const handleSubirImagen = async (file) => {
    setIsLoadingApp(true);
    try {
      const dataImgUp = await uploadImageFirestore(file);
      barbershopSelected.imagenes.push(dataImgUp);
      const newValues = { imagenes: barbershopSelected.imagenes };
      await updateBarbershop(newValues, barbershopSelected._id);
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
      const pathImg = `barbershops/${id}.${extension}`;
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
      await updateBarbershop(newValues, barbershopSelected._id);

      setImagenes(newImages);
      toast.success("Imagen Eliminada");
    } catch (e) {
      console.log("error en handleEliminarImagen()", e);
      toast.error("No se pudo Eliminar ");
    }
  };

  return (
    <div>
      {barbershopSelected !== null ? (
        <ImagesContainer
          imagenes={imagenes}
          handleSubirImagen={handleSubirImagen}
          handleEliminarImagen={handleEliminarImagen}
        />
      ) : (
        <AlertWarning
          text={"Debe seleccionar una barberia para modificar sus Imágenes"}
        />
      )}
    </div>
  );
};

export default TabImagenes;

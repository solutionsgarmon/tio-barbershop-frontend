import React, { useEffect, useState } from "react";

import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";
import appFirebase from "../../../../credencialesFireStore";
import { v4 as genID } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppContext } from "../../../context/AppProvider";
import { toast } from "react-toastify";
import { updateBarbershop, updateCurso, updateProduct } from "../../../api/updates";

const TabImagenes = ({ productSelected }) => {
	const { setIsLoadingApp } = useAppContext();
	const storage = getStorage(appFirebase);
	const [imagenes, setImagenes] = useState([]);

	useEffect(() => {
		if (productSelected) {
			console.log("Cambió productSelected", productSelected);
			setImagenes(productSelected.imagenes);
		}
	}, []);

	const handleSubirImagen = async (file) => {
		setIsLoadingApp(true);
		try {
			const dataImgUp = await uploadImageFirestore(file);
			productSelected.imagenes.push(dataImgUp);
			const newValues = { imagenes: productSelected.imagenes };
			await updateCurso(newValues, productSelected._id);
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
			const pathImg = `cursos/${id}.${extension}`;
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
			const newImages = imagenes.filter((imagen) => dataImagen.id !== imagen.id);
			const newValues = { imagenes: newImages };
			await updateCurso(newValues, productSelected._id);

			setImagenes(newImages);
			toast.success("Imagen Eliminada");
		} catch (e) {
			console.log("error en handleEliminarImagen()", e);
			toast.error("No se pudo Eliminar ");
		}
	};

	return (
		<div>
			{productSelected !== null ? (
				<ImagesContainer imagenes={imagenes} handleSubirImagen={handleSubirImagen} handleEliminarImagen={handleEliminarImagen} />
			) : (
				<AlertWarning text={"Debe seleccionar un Curso para modificar sus Imágenes"} />
			)}
		</div>
	);
};

export default TabImagenes;

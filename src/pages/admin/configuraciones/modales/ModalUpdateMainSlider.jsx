import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../context/AppProvider";
import { Toast } from "react-bootstrap";
import { updateAppSettings } from "../../../../api/updates";
import { v4 as genID } from "uuid";
import appFirebase from "../../../../../credencialesFireStore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ModalUpdateMainSlider = ({
  open,
  handleClose,
  selectedRow,
  appSettings,
  isCreate,
  isUpdate,
}) => {
  const storage = getStorage(appFirebase);
  const [textoPrincipal, setTextoPrincipal] = useState("");
  const [textoSecundario, setTextoSecundario] = useState("");
  const [textoBoton, setTextoBoton] = useState("");
  const [linkBoton, setLinkBoton] = useState("");
  const [posicion, setPosicion] = useState("0");
  const [modificoImagen, setModificoImagen] = useState(false);
  const [urlFirebaseImgUploaded, setUrlFirebaseImgUploaded] = useState("");

  const { setIsLoadingApp } = useAppContext();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setTextoPrincipal(selectedRow.principal_text);
      setTextoSecundario(selectedRow.secondary_text);
      setTextoBoton(selectedRow.buttonText);
      setUrlFirebaseImgUploaded(selectedRow.image);
      setLinkBoton(selectedRow.link_button);
      setPosicion(selectedRow.posicion);
      setModificoImagen(false);
    }
    return () => {
      setTextoPrincipal("");
      setTextoSecundario("");
      setTextoBoton("");
      setUrlFirebaseImgUploaded("");
      setPosicion("0");
      setLinkBoton("");
      setFileList([]);
    };
  }, [open, selectedRow]);

  useEffect(() => {
    if (selectedRow && selectedRow.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: selectedRow.image,
        },
      ]);
    }
  }, [selectedRow]);

  const handleChange = async ({ fileList }) => {
    console.log("fileList");
    setFileList([...fileList.slice(-1)]);
    setModificoImagen(true);
  }; // Permitir solo la última imagen

  const handleCreate = async () => {
    console.log("Creando nuevo Registro...");

    let dataImgUp;
    if (fileList.length > 0 && modificoImagen)
      dataImgUp = await uploadImageFirestore(fileList[0].originFileObj);

    let newBanner = {
      image: dataImgUp ? dataImgUp.url : urlFirebaseImgUploaded,
      principal_text: textoPrincipal,
      secondary_text: textoSecundario,
      buttonText: textoBoton,
      posicion: posicion,
      link_button: linkBoton,
    };

    let bannersPrincipales = appSettings.main_slider;
    bannersPrincipales.push(newBanner);
    let values = {
      main_slider: bannersPrincipales,
    };
    try {
      const idAppSettings = appSettings._id;
      const resp = await updateAppSettings(values, idAppSettings);
      console.log("resp", resp);
      if (resp.data.success) {
        toast.success("Se modificó correctamente.");
        handleClose();
      } else {
        toast.error("No se pudo modificar.");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      toast.error("Error al modificar.");
    }
  };

  const handleUpdate = async () => {
    console.log("Guardando Cambios al Registro...");
    let dataImgUp;
    if (fileList.length > 0 && modificoImagen)
      dataImgUp = await uploadImageFirestore(fileList[0].originFileObj);

    let newBanner = {
      image: dataImgUp ? dataImgUp.url : urlFirebaseImgUploaded,
      principal_text: textoPrincipal,
      secondary_text: textoSecundario,
      buttonText: textoBoton,
      posicion: posicion,
      link_button: linkBoton,
    };

    let bannersPrincipales = appSettings.main_slider.map((banner) => {
      if (banner._id == selectedRow._id) {
        return newBanner;
      } else {
        return banner;
      }
    });

    let values = {
      main_slider: bannersPrincipales,
    };
    try {
      const idAppSettings = appSettings._id;
      const resp = await updateAppSettings(values, idAppSettings);
      console.log("resp", resp);
      if (resp.data.success) {
        toast.success("Se modificó correctamente.");
        handleClose();
      } else {
        toast.error("No se pudo modificar.");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      toast.error("Error al modificar.");
    }
  };

  const handleSubirImagen = async (file) => {
    setIsLoadingApp(true);
    try {
      const dataImgUp = await uploadImageFirestore(file);
      console.log("dataImgUp", dataImgUp);
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
      const pathImg = `app-settings/main-banners/${id}.${extension}`;
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir Imagen</div>
    </div>
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          backgroundColor: "#E2b753 ", // Color de Fondo
          color: "white", // Color del Texto
        }}
      >
        <Typography variant="h6">Banners Principales</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack direction={"row"} alignItems="center" justifyContent="center">
          <TextField
            label="Texto Secundario"
            value={textoSecundario}
            onChange={(e) => setTextoSecundario(e.target.value)}
            fullWidth
            sx={{ mb: 1.5, mr: 1.5 }}
          />
          <TextField
            label="Posición"
            value={posicion}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              // Verificar si el valor ingresado es un número
              if (!isNaN(value)) {
                setPosicion(value);
              }
            }}
            sx={{ width: 120, mb: 1.5 }}
          />
        </Stack>
        <TextField
          label="Texto Principal"
          value={textoPrincipal}
          onChange={(e) => setTextoPrincipal(e.target.value)}
          fullWidth
          sx={{ mb: 1.5 }}
        />

        <Stack direction={"row"} alignItems="center" justifyContent="center">
          <TextField
            fullWidth
            label="Texto Botón"
            value={textoBoton}
            onChange={(e) => setTextoBoton(e.target.value)}
            sx={{ mb: 1.5, mr: 1.5 }}
          />
          <TextField
            fullWidth
            label="Redirección (URL)"
            value={linkBoton}
            onChange={(e) => setLinkBoton(e.target.value)}
            sx={{ mb: 1.5 }}
          />
        </Stack>

        <Stack direction={"row"} alignItems="center" justifyContent="center">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            multiple={false} // Permitir solo la carga de una imagen
          >
            {fileList.length === 0 && uploadButton}
          </Upload>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        {isUpdate && (
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Guardar Cambios
          </Button>
        )}
        {isCreate && (
          <Button onClick={handleCreate} color="primary" variant="contained">
            Guardar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateMainSlider;

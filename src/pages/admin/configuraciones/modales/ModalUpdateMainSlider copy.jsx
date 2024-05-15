import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../context/AppProvider";
import { Toast } from "react-bootstrap";
import { updateAppSettings } from "../../../../api/updates";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModalUpdateMainSlider = ({
  open,
  handleClose,
  selectedRow,
  appSettings,
  isCreate,
  isUpdate,
}) => {
  const [textoPrincipal, setTextoPrincipal] = useState("");
  const [textoSecundario, setTextoSecundario] = useState("");
  const [textoBotton, setTextoBotton] = useState("");
  const [urlFirebaseImgUploaded, setUrlFirebaseImgUploaded] = useState("");

  const { setIsLoadingApp } = useAppContext();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setTextoPrincipal(selectedRow.principal_text);
      setTextoSecundario(selectedRow.secondary_text);
      setTextoBotton(selectedRow.buttonText);
      setUrlFirebaseImgUploaded(selectedRow.image);
    }
    return () => {
      setTextoPrincipal("");
      setTextoSecundario("");
      setTextoBotton("");
      setUrlFirebaseImgUploaded("");
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
      setPreviewImage(selectedRow.image);
    }
  }, [selectedRow]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList }) => {
    console.log("fileList");
    setFileList([...fileList.slice(-1)]);
    // let file;
    // const dataImgUp = await uploadImageFirestore(file);
  }; // Permitir solo la última imagen

  const handleCreate = async () => {
    console.log("Creando nuevo Registro...");
    let newBanner = {
      image: urlFirebaseImgUploaded,
      principal_text: textoPrincipal,
      secondary_text: textoSecundario,
      buttonText: textoBotton,
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
    let newBanner = {
      image: urlFirebaseImgUploaded,
      principal_text: textoPrincipal,
      secondary_text: textoSecundario,
      buttonText: textoBotton,
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
        <TextField
          label="Texto Principal"
          value={textoPrincipal}
          onChange={(e) => setTextoPrincipal(e.target.value)}
          fullWidth
          sx={{ mb: 1.5 }}
        />
        <TextField
          label="Texto Secundario"
          value={textoSecundario}
          onChange={(e) => setTextoSecundario(e.target.value)}
          fullWidth
          sx={{ mb: 1.5 }}
        />
        <TextField
          label="Texto Botón"
          value={textoBotton}
          onChange={(e) => setTextoBotton(e.target.value)}
          fullWidth
          sx={{ mb: 1.5 }}
        />
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple={false} // Permitir solo la carga de una imagen
        >
          {fileList.length === 0 && uploadButton}
        </Upload>
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

import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Stack, Button, ImageList, ImageListItem } from "@mui/material";
import { Typography } from "antd";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppProvider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function StandardImageList({
  imagenes,
  handleSubirImagen,
  handleEliminarImagen,
}) {
  const { windowWidth } = useAppContext();
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const handleInputChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      handleSubirImagen(archivo);
    } else {
      toast.warning("Por favor sube una imagen");
    }
  };

  return (
    <Paper
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ImageList
        sx={{ width: 600, maxHeight: 600 }}
        cols={windowWidth <= 768 ? 2 : 3}
        rowHeight={260}
      >
        <ImageListItem>
          <Button
            sx={{ mb: 0, height: "100%", width: "100%", fontSize: "larger" }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            <Stack sx={{ alignItems: "center" }}>
              <CloudUploadIcon sx={{ width: 50, height: 50 }} />
              Subir Imagen
            </Stack>
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => handleInputChange(event)}
            />
          </Button>
        </ImageListItem>
        {imagenes.map((item, index) => (
          <ImageListItem
            key={item.url}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ position: "relative" }}
          >
            <img
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              alt={item.url}
              loading="lazy"
              style={{ borderRadius: "10px" }}
            />
            {hoveredIndex === index && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleEliminarImagen(item)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  borderRadius: "30px",
                }}
              >
                Eliminar
              </Button>
            )}
          </ImageListItem>
        ))}
        {imagenes.length === 0 && (
          <ImageListItem key={"default-imageList"} sx={{ textAlign: "center" }}>
            <Stack direction={"column"} alignItems="center">
              <NoPhotographyIcon sx={{ width: 80, height: 80, mt: 5 }} />
              <Typography sx={{ textAlign: "center" }}>Sin imágenes</Typography>
            </Stack>
          </ImageListItem>
        )}
      </ImageList>
    </Paper>
  );
}

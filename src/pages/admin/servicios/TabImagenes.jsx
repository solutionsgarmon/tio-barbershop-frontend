import React from "react";
import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";

const TabImagenes = ({ serviceSelected }) => {
  return (
    <div>
      {serviceSelected !== null ? (
        <ImagesContainer />
      ) : (
        <AlertWarning
          text={"Debe seleccionar un servicio para modificar sus Imagenes"}
        />
      )}
    </div>
  );
};

export default TabImagenes;

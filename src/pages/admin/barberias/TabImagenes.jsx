import React from "react";

import AlertWarning from "../../../components/messages/AlertWarning";
import ImagesContainer from "../../../components/containers/ImagesContainer";

const TabImagenes = ({ productSelected }) => {
  return (
    <div>
      {productSelected !== null ? (
        <ImagesContainer />
      ) : (
        <AlertWarning
          text={"Debe seleccionar un producto para modificar sus Imagenes"}
        />
      )}
    </div>
  );
};

export default TabImagenes;

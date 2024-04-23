import React from "react";
import { useEffect } from "react";

const CitasDatosCliente = ({ setEnableButton }) => {
  useEffect(() => {
    setEnableButton(true);
  }, []);

  return <div>CitasDatosCliente</div>;
};

export default CitasDatosCliente;

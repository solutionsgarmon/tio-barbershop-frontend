//TODO NO ESTA HECHO AUN
import React from "react";
import { useAppContext } from "../../../context/AppProvider";

import TabMainSlider from "./TabMainSlider";

const COMPONENTS = [<TabMainSlider />];

const Configuracion = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;
  return SelectedComponent;
};

export default Configuracion;

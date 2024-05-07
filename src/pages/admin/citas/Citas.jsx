//TODO NO ESTA HECHO AUN
import React from "react";
import { useAppContext } from "../../../context/AppProvider";
import TabCitas from "./TabCitas";
import TabCitasRegistro from "./TabCitasRegistro";

const COMPONENTS = [<TabCitas />, <TabCitasRegistro />];

const Citas = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;
  return SelectedComponent;
};

export default Citas;

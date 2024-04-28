//TODO NO ESTA HECHO AUN
import React from "react";
import { useAppContext } from "../../../context/AppProvider";
import TabCitas from "./TabCitas";

const COMPONENTS = [<TabCitas />];

const Citas = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;
  return SelectedComponent;
};

export default Citas;

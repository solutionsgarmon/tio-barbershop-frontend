import React from "react";
import TabUsers from "./TabUsers";
import { useAppContext } from "../../../context/AppProvider";

const COMPONENTS = [<TabUsers />];

const Users = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;
  return SelectedComponent;
};

export default Users;

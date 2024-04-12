import { Box } from "@mui/material";
import React from "react";
import TabUsers from "./TabUsers";
import { useEffect } from "react";
import { useAppContext } from "../../../context/AppProvider";

import TabAdministradores from "./TabAdministradores";
import TabBarbers from "./TabBarbers";

const COMPONENTS = [<TabUsers />, <TabBarbers />, <TabAdministradores />];

const Users = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;
  return SelectedComponent;
};

export default Users;

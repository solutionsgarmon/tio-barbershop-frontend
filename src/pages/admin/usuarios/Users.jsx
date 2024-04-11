import { Box } from "@mui/material";
import React from "react";
import TabUsers from "./TabUsers";
import { useEffect } from "react";
import { useAppContext } from "../../../context/AppProvider";

const COMPONENTS = [<TabUsers />];

const Users = () => {
  const { indexTabSelected } = useAppContext();
  const SelectedComponent = COMPONENTS[indexTabSelected] || null;

  return SelectedComponent;
};

export default Users;

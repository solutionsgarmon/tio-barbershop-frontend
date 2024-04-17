import { Box } from "@mui/material";
import React from "react";
import { useAppContext } from "../../../context/AppProvider";

import { useState } from "react";
import { getAdmins } from "../../../api/gets";
import { useEffect } from "react";

import TabAdministradores from "./TabAdministradores";

const Administradores = () => {
  const { indexTabSelected, setIndexTabSelected } = useAppContext();
  return <Box>{indexTabSelected == 0 && <TabAdministradores />}</Box>;
};

export default Administradores;

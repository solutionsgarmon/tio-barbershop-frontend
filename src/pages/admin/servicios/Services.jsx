import { Box } from "@mui/material";
import React from "react";
import TableServices from "./TableServices";
import { useAppContext } from "../../../context/AppProvider";
import TabImagenes from "./TabImagenes";
import { useState } from "react";

const Services = () => {
  const { indexTabSelected, setIndexTabSelected } = useAppContext();
  const [serviceSelected, setServiceSelected] = useState(null);
  return (
    <Box>
      {indexTabSelected == 0 && (
        <TableServices setServiceSelected={setServiceSelected} />
      )}
      {indexTabSelected == 1 && (
        <TabImagenes serviceSelected={serviceSelected} />
      )}
    </Box>
  );
};

export default Services;

import { Box, Typography } from "@mui/material";
import React from "react";
import TableBarbershops from "./TabBarbershops";
import { useAppContext } from "../../../context/AppProvider";
import TabBarbershops from "./TabBarbershops";
import TabBarbers from "./TabBarbers";
import TableServices from "../servicios/TableServices";
import { useState } from "react";
import {
  getBarbers,
  getBarbershops,
  getProducts,
  getServices,
} from "../../../api/gets";
import { useEffect } from "react";

const Barbershops = () => {
  const { indexTabSelected } = useAppContext();
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [barbershopSelected, setBarbershopSelected] = useState(null);
  const [isLoading, setIsLoadingData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setBarbershops(await getBarbershops());
      setBarbers(await getBarbers());
      setServices(await getServices());
      setProducts(await getProducts());
    }
    fetchData();
    setIsLoadingData(false);
  }, []);

  return (
    <Box>
      {indexTabSelected == 0 && (
        <TabBarbershops setBarbershopSelected={setBarbershopSelected} />
      )}
      {indexTabSelected == 1 && (
        <TabBarbers
          barbers={barbers}
          assignedBarbers={barbershopSelected?.barberos}
          barbershopSelected={barbershopSelected}
        />
      )}

      {indexTabSelected == 2 && <TableServices />}
    </Box>
  );
};

export default Barbershops;

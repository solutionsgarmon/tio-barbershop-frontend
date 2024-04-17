import { Box, Typography } from "@mui/material";
import React from "react";
import TableBarbershops from "./TabBarbershops";
import { useAppContext } from "../../../context/AppProvider";
import TabBarbershops from "./TabBarbershops";
import TabBarbers from "./TabBarbers";
import { useState } from "react";
import {
  getBarbers,
  getBarbershops,
  getProducts,
  getServices,
} from "../../../api/gets";
import { useEffect } from "react";
import TabProductos from "./TabProducts";
import TabImagenes from "./TabImagenes";
import TabHorario from "./TabHorario";

const Barbershops = () => {
  const { indexTabSelected, setIndexTabSelected } = useAppContext();
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [barbershopSelected, setBarbershopSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setBarbershops(await getBarbershops());
      setBarbers(await getBarbers());
      setServices(await getServices());
      setProducts(await getProducts());
      setIsLoading(false); // Mover aquí para que se establezca en false después de obtener los datos
    }

    fetchData();
    setBarbershopSelected(null);
    setIndexTabSelected(0);
  }, [reloadData]);

  return (
    <Box>
      {indexTabSelected == 0 && (
        <TabBarbershops
          setBarbershopSelected={setBarbershopSelected}
          setReloadData={setReloadData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {indexTabSelected == 1 && (
        <TabBarbers
          barbers={barbers}
          assignedBarbers={barbershopSelected?.barberos}
          barbershopSelected={barbershopSelected}
          setReloadData={setReloadData}
        />
      )}

      {indexTabSelected == 2 && (
        <TabProductos
          products={products}
          barbershopSelected={barbershopSelected}
          setReloadData={setReloadData}
        />
      )}
      {indexTabSelected == 3 && (
        <TabHorario
          barbershopSelected={barbershopSelected}
          setReloadData={setReloadData}
        />
      )}
      {indexTabSelected == 4 && (
        <TabImagenes
          barbershopSelected={barbershopSelected}
          setReloadData={setReloadData}
        />
      )}
    </Box>
  );
};

export default Barbershops;

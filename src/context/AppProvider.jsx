import { TroubleshootRounded } from "@mui/icons-material";
import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getBarbers,
  getBarbershops,
  getCitas,
  getProducts,
  getServices,
  getUsers,
} from "../api/gets";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [flagTransparent, setFlagTransparent] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [users, setUsers] = useState([]);

  const [barbers, setBarbers] = useState([]);
  const [barbershops, setBarbershops] = useState([]);
  const [products, setProducts] = useState([]);
  const [citas, setCitas] = useState([]);
  const [services, setServices] = useState([]);

  const [indexTabSelected, setIndexTabSelected] = useState(0);

  //Funcion para actualizar una coleccion en concreto
  async function getData(name) {
    name = name.toLowerCase();
    switch (name) {
      case "users":
        setUsers(await getUsers());
        break;
      case "barbers":
        setBarbers(await getBarbers());
        break;
      case "barbershops":
        setBarbershops(await getBarbershops());
        break;
      case "products":
        setProducts(await getProducts());
        break;
      case "citas":
        setCitas(await getCitas());
        break;
      case "services":
        setServices(await getServices());
        break;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log("window.innerWidth", window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const contextValue = {
    flagTransparent,
    setFlagTransparent,
    windowWidth,
    users,
    setUsers,
    setBarbers,
    setBarbershops,
    setProducts,
    setCitas,
    setServices,
    barbers,
    barbershops,
    products,
    citas,
    services,
    indexTabSelected,
    setIndexTabSelected,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useAppContext = () => useContext(AppContext);

export default AppProvider;

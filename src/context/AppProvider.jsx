import { TroubleshootRounded } from "@mui/icons-material";
import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getBarbers, getBarbershops, getProducts, getUsers } from "../api/gets";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [flagTransparent, setFlagTransparent] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [barbershops, setBarbershops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setBarbers(await getBarbers());
      setBarbershops(await getBarbershops());
      setProducts(await getProducts());
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const usersData = await getUsers();
        console.log("USUARIOS", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    getData();
  }, [reloadUsers]);

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
    barbers,
    barbershops,
    products,
    setReloadUsers,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useAppContext = () => useContext(AppContext);

export default AppProvider;

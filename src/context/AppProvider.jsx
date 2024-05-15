import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getFromLocalStorage } from "../helpers/localStorageHelper";
import { getAppSettings, getBarbershops } from "../api/gets";

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
  const [avatarURL, setAvatarURL] = useState("");
  const [isAutenticated, setIsAutenticated] = useState(false);
  const [indexTabSelected, setIndexTabSelected] = useState(0);
  const [reload, setReload] = useState(false);
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const [sessionDataStorage, setSessionDataStorage] = useState(null);
  const [appSettings, setAppSettings] = useState([]);
  // const settings = await getAppSettings();
  // setAppSettings(settings[0]);

  useEffect(() => {
    async function fetchData() {
      verifySession();
      setBarbershops(await getBarbershops());
      const settings = await getAppSettings();
      setAppSettings(settings[0]);
      // setBarbers(await getBarbers());
      // setServices(await getServices());
      // setProducts(await getProducts());
    }
    fetchData();
  }, [reload]);

  // const verifySessionFB = () => {
  //   const session = getFromLocalStorage("session");
  //   if (session) {
  //     setIsAutenticated(true);
  //     setAvatarURL(session.urlImage);
  //   } else {
  //     setIsAutenticated(false);
  //   }
  // };

  const verifySession = () => {
    const session = getFromLocalStorage("session");
    if (session) {
      console.log("session", session);
      setSessionDataStorage(session);
      setIsAutenticated(true);
      setAvatarURL(session.urlImage);
    } else {
      setIsAutenticated(false);
    }
  };

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
    verifySession,
    isAutenticated,
    avatarURL,
    setReload,
    setIsLoadingApp,
    isLoadingApp,
    sessionDataStorage,
    setSessionDataStorage,

    appSettings,
    setAppSettings,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useAppContext = () => useContext(AppContext);

export default AppProvider;

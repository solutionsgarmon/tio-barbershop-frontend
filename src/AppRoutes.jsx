import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";
import Servicios from "./pages/Servicios";
import Sucursales from "./pages/Sucursales";

import Tienda from "./pages/Tienda";
import Citas from "./pages/Citas";
import NavigationBar from "./components/bars/NavigationBar";
import { Box } from "@mui/material";
import Footer from "./components/molecules/Footer";
import ErrorPage from "./pages/ErrorPage";
import Administracion from "./pages/Administracion";
import Login from "./pages/Login";
import { getServices, getProducts } from "./api/gets";
import { useEffect } from "react";
import Cursos from "./pages/Cursos";

function AppRoutes() {
  const [showNavigationBar, setShowNavigationBar] = useState(true);
  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProducts(await getProducts());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setServices(await getServices());
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#EEE", m: "auto" }}>
      {showNavigationBar && (
        <NavigationBar
          setShowNavigationBar={setShowNavigationBar}
          setShowModalRegistro={setShowModalRegistro}
        />
      )}
      <Box sx={{ margin: "auto", pt: 10, minHeight: "60vh" }}>
        <Routes>
          {/* <Route path="/provocarError" element={<ComponentWithError />} /> */}
          <Route
            path="/"
            element={<Home services={services} products={products} />}
          />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/tienda" element={<Tienda products={products} />} />
          <Route
            path="/servicios"
            element={<Servicios services={services} />}
          />
          <Route path="/sucursales" element={<Sucursales />} />

          <Route path="/citas" element={<Citas />} />

          <Route path="/cursos" element={<Cursos />} />
          <Route
            path="/login"
            element={
              <Login
                showModalRegistro={showModalRegistro}
                setShowModalRegistro={setShowModalRegistro}
              />
            }
          />
          <Route
            path="/administracion"
            element={
              <Administracion setShowNavigationBar={setShowNavigationBar} />
            }
          />
        </Routes>
      </Box>
      {showNavigationBar && <Footer />}
    </Box>
  );
}

export default AppRoutes;

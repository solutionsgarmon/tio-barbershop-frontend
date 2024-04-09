import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function AppRoutes() {
  const [showNavigationBar, setShowNavigationBar] = useState(true);
  return (
    <Box sx={{ backgroundColor: "#EEE" }}>
      {showNavigationBar && (
        <NavigationBar setShowNavigationBar={setShowNavigationBar} />
      )}
      <Box sx={{ margin: "auto", pt: 8.5 }}>
        <Routes>
          {/* <Route path="/provocarError" element={<ComponentWithError />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/error" element={<ErrorPage />} />
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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./context/AppProvider.jsx";
import ToastProvider from "./context/ToastProvider.jsx";

// Estilos del scrollbar
const scrollbarStyles = `
  /* Estilo del scrollbar */
  ::-webkit-scrollbar {
    width: 6px; 
    background-color: #000;
  }

  /* Estilo del thumb (la parte que puedes arrastrar) */
  ::-webkit-scrollbar-thumb {
    background-color: #E2b753 ; /* Color del thumb */
    border-radius: 8px; /* Radio de borde del thumb */

  }

  /* Cambio de color del thumb cuando se le pasa el mouse */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #E2b753;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <style>{scrollbarStyles}</style>

    <AppProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>
);

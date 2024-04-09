import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./context/AppProvider.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage.jsx";
import ToastProvider from "./context/ToastProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ErrorBoundary>
    </AppProvider>
  </React.StrictMode>
);

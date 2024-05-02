import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loader from "./components/atoms/Loader";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useAppContext } from "./context/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Century_Gothic from "./fonts/Century_Gothic.ttf";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";

import { CssBaseline } from "@mui/material";

function App() {
  const { isLoadingApp } = useAppContext();

  useEffect(() => {
    console.log("VERSION 1.4.29");
  }, []);

  const main_theme = createTheme({
    typography: {
      fontFamily: [Century_Gothic, "Arial", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={main_theme}>
      <Box sx={{ backgroundColor: "#000" }}>
        <HashRouter>
          <ErrorBoundary fallback={<ErrorPage />}>
            <AppRoutes />
          </ErrorBoundary>
        </HashRouter>
        <Loader showBackdrop={isLoadingApp} />
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loader from "./components/atoms/Loader";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useAppContext } from "./context/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Century_Gothic from "./fonts/Century_Gothic.ttf";

function App() {
  const { isLoadingApp } = useAppContext();

  useEffect(() => {
    console.log("VERSION 1.01");
  }, []);

  const main_theme = createTheme({
    typography: {
      fontFamily: [Century_Gothic, "Arial", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={main_theme}>
      <Box sx={{ backgroundColor: "#000" }}>
        <Router>
          <AppRoutes />
        </Router>
        <Loader showBackdrop={isLoadingApp} />
      </Box>
    </ThemeProvider>
  );
}

export default App;

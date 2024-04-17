import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loader from "./components/atoms/Loader";
import { Box } from "@mui/material";
import { useAppContext } from "./context/AppProvider";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const { isLoadingApp } = useAppContext();

  return (
    <Box>
      <Router>
        <AppRoutes />
      </Router>
      <Loader showBackdrop={isLoadingApp} />
    </Box>
  );
}

export default App;

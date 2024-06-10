import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loader from "./components/atoms/Loader";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useAppContext } from "./context/AppProvider";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";
import { CssBaseline } from "@mui/material";
import InactividadDetector from "./components/molecules/InactividadDetector"; // Importa tu componente de inactividad
import "./fonts/fonts.css";
import InactividadDetector2 from "./components/molecules/InactividadDetector2";

function App() {
	const { isLoadingApp } = useAppContext();

	useEffect(() => {
		console.log("VERSION 1.4.29");
	}, []);

	const main_theme = createTheme({
		typography: {
			fontFamily: "Century Gothic",
		},
		palette: {
			primary: {
				main: "#E2b753", // Color dorado
			},
		},
	});

	return (
		<ThemeProvider theme={main_theme}>
			<CssBaseline />
			<Box sx={{ backgroundColor: "#000" }}>
				<HashRouter>
					<ErrorBoundary fallback={<ErrorPage />}>
						<InactividadDetector2>
							<InactividadDetector>
								<AppRoutes />
							</InactividadDetector>
						</InactividadDetector2>
					</ErrorBoundary>
				</HashRouter>
				<Loader showBackdrop={isLoadingApp} />
			</Box>
		</ThemeProvider>
	);
}

export default App;

import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loader from "./components/atoms/Loader";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useAppContext } from "./context/AppProvider";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";
import { CssBaseline } from "@mui/material";
import InactividadDetector from "./components/molecules/InactividadDetector"; // Importa tu componente de inactividad
import "./fonts/fonts.css";
import InactividadDetector2 from "./components/molecules/InactividadDetector2";

function App() {
	const { isLoadingApp } = useAppContext();

	const [isFullscreen, setIsFullscreen] = useState(false);

	const enterFullscreen = () => {
		const elem = document.documentElement;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
		setIsFullscreen(true);
	};

	const exitFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		setIsFullscreen(false);
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) {
				setIsFullscreen(false);
			}
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
		document.addEventListener("mozfullscreenchange", handleFullscreenChange);
		document.addEventListener("MSFullscreenChange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
			document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
			document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
		};
	}, []);

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
								<AppRoutes isFullscreen={isFullscreen} exitFullscreen={exitFullscreen} enterFullscreen={enterFullscreen} />
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

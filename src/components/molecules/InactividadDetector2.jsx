//Este detecta la ultima actividad y la guarda en el localStorage

import { useEffect } from "react";
import { cerrarSesionUsuario } from "../../api/FirebaseService";
import { useAppContext } from "../../context/AppProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const InactividadDetector2 = ({ children }) => {
	const { sessionDataStorage } = useAppContext();
	useEffect(() => {
		const updateLastActivity = () => {
			const currentTime = Date.now();
			localStorage.setItem("lastActivity", currentTime);
			//console.log("Last activity updated:", new Date(currentTime));
		};

		const checkLastActivity = () => {
			const lastActivity = localStorage.getItem("lastActivity");
			if (lastActivity && sessionDataStorage) {
				const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
				const oneHour = 60 * 60 * 1000;

				console.log("Time since last activity (ms):", timeSinceLastActivity);

				if (timeSinceLastActivity > oneHour) {
					console.log("More than an hour of inactivity. Showing alert.");
					Swal.fire({
						title: "Sesión expirada",
						text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
						icon: "warning",
						confirmButtonText: "OK",
					}).then((result) => {
						if (result.isConfirmed) {
							//localStorage.removeItem("lastActivity");
							cerrarSesionUsuario();
							window.location.reload();
						}
					});
				} else {
					//toast.success("Sesión Restaurada");
				}
			} else {
				console.log("No last activity record. Redirecting to login.");
			}
		};

		checkLastActivity(); // Verificar al cargar el componente

		const events = ["keydown", "click", "scroll"];

		events.forEach((event) => window.addEventListener(event, updateLastActivity));

		return () => {
			events.forEach((event) => window.removeEventListener(event, updateLastActivity));
		};
	}, [sessionDataStorage]);

	return children;
};

export default InactividadDetector2;

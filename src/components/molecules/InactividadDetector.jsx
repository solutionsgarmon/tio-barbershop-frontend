import React, { useEffect, useState } from "react";
import { cerrarSesionUsuario } from "../../api/FirebaseService";
import { useAppContext } from "../../context/AppProvider";
import Swal from "sweetalert2";

const TIEMPO_INACTIVIDAD = 600;
const TIEMPO_INACTIVIDAD_BARBEROS = 3600; //1 hora

const TIEMPO_INICIA_CONTEO = 60;
const TIEMPO_INICIA_CONTEO_BARBEROS = 300;

const InactividadDetector = ({ children }) => {
	const { sessionDataStorage } = useAppContext();
	const [inactivo, setInactivo] = useState(false);
	const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_INACTIVIDAD);
	const [tiempoRestanteBarberos, setTiempoRestanteBarberos] = useState(TIEMPO_INACTIVIDAD_BARBEROS);

	useEffect(() => {
		console.log("window.location.pathname", window.location.pathname);
		const handleMouseOrClickOrTouch = () => {
			setInactivo(false);
			resetTiempoRestante();
		};

		const handleInactividad = () => {
			setInactivo(true);
		};

		const resetTiempoRestante = () => {
			setTiempoRestante(TIEMPO_INACTIVIDAD); // Reinicia el contador de tiempo
			setTiempoRestanteBarberos(TIEMPO_INACTIVIDAD_BARBEROS);
		};

		const actualizarTiempo = () => {
			setTiempoRestante((prevTiempo) => prevTiempo - 1);
			setTiempoRestanteBarberos((prevTiempo) => prevTiempo - 1);
		};

		// Agrega listeners para el movimiento del mouse y clics
		document.addEventListener("mousemove", handleMouseOrClickOrTouch);
		document.addEventListener("click", handleMouseOrClickOrTouch);
		document.addEventListener("touchstart", handleMouseOrClickOrTouch);

		// Verifica la inactividad cada cierto intervalo (por ejemplo, cada segundo)
		const interval = setInterval(() => {
			handleInactividad();
			actualizarTiempo();
		}, 1000);

		// Limpia los listeners y el intervalo cuando el componente se desmonta
		return () => {
			document.removeEventListener("mousemove", handleMouseOrClickOrTouch);
			document.removeEventListener("click", handleMouseOrClickOrTouch);
			document.removeEventListener("touchstart", handleMouseOrClickOrTouch);
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (sessionDataStorage && inactivo && tiempoRestante === 0) {
			if (sessionDataStorage.rol === "CLIENTE") {
				Swal.fire({
					title: "Sesión expirada",
					text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
					icon: "warning",
					confirmButtonText: "OK",
				}).then((result) => {
					if (result.isConfirmed) {
						cerrarSesionUsuario();
						window.location.reload();
					}
				});
			}
		}
		if (sessionDataStorage && inactivo && tiempoRestanteBarberos === 0) {
			if (sessionDataStorage.rol === "BARBERO") {
				Swal.fire({
					title: "Sesión expirada",
					text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
					icon: "warning",
					confirmButtonText: "OK",
				}).then((result) => {
					if (result.isConfirmed) {
						cerrarSesionUsuario();
						window.location.reload();
					}
				});
			}
		}
	}, [inactivo, tiempoRestante, tiempoRestanteBarberos, sessionDataStorage?.rol]);

	return (
		<div>
			{children}
			{/* //EXCLUIR EL CONTADOR DE LOGIN Y HOME */}
			{sessionDataStorage && sessionDataStorage.rol == "CLIENTE" && tiempoRestante < TIEMPO_INICIA_CONTEO && tiempoRestante > 0 && (
				<>
					{console.log("Debido a ...")}
					<p
						className='text-center font-bold md:text-lg lg:text-xl xl:text-2xl'
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "#E2b753",
							padding: "20px",
							borderRadius: "20px",
							fontSize: "1rem",
							maxWidth: "90%",
						}}
					>
						Debido a su inactividad, su sesión se cerrará en {tiempoRestante} segundos.
					</p>

					<style jsx>{`
						@media (min-width: 768px) {
							p {
								font-size: 1.125rem; /* md:text-lg */
							}
						}
						@media (min-width: 1024px) {
							p {
								font-size: 1.25rem; /* lg:text-xl */
							}
						}
						@media (min-width: 1280px) {
							p {
								font-size: 1.5rem; /* xl:text-2xl */
							}
						}
					`}</style>
				</>
			)}

			{/* MENSAJE INACTIVIDAD BARBERO */}
			{sessionDataStorage && sessionDataStorage.rol == "BARBERO" && tiempoRestanteBarberos < TIEMPO_INICIA_CONTEO_BARBEROS && tiempoRestanteBarberos > 0 && (
				<>
					<p
						className='text-center font-bold md:text-lg lg:text-xl xl:text-2xl'
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "#E2b753",
							padding: "20px",
							borderRadius: "20px",
							fontSize: "1rem",
							maxWidth: "90%",
						}}
					>
						Debido a su inactividad, su sesión se cerrará en {tiempoRestanteBarberos} segundos.
					</p>

					<style jsx>{`
						@media (min-width: 768px) {
							p {
								font-size: 1.125rem; /* md:text-lg */
							}
						}
						@media (min-width: 1024px) {
							p {
								font-size: 1.25rem; /* lg:text-xl */
							}
						}
						@media (min-width: 1280px) {
							p {
								font-size: 1.5rem; /* xl:text-2xl */
							}
						}
					`}</style>
				</>
			)}
		</div>
	);
};

export default InactividadDetector;

import { Box } from "@mui/material";
import React from "react";
import { useAppContext } from "../../../context/AppProvider";
import { useState } from "react";
import { useEffect } from "react";

import TabDescansosBarbero from "./TabDescansosBarbero";
import TabDescansosAdmin from "./TabDescansosAdmin";
import TabRegistroDescansosAdmin from "./TabRegistroDescansosAdmin";

const Descansos = () => {
	const { indexTabSelected, setIndexTabSelected, sessionDataStorage, setIsLoadingApp } = useAppContext();

	const [reloadData, setReloadData] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		async function fetchData() {
			//setIsLoadingApp(true);
			//setIsLoadingApp(false);
			setIsLoadingApp(false);
		}
		setIsLoadingApp(true);
		fetchData();
		//setBarberSelected(null);
	}, [reloadData]);

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<Box>
			{indexTabSelected == 0 && sessionDataStorage?.rol == "BARBERO" && <TabDescansosBarbero />}
			{indexTabSelected == 0 && sessionDataStorage?.rol == "ADMINISTRADOR" && <TabDescansosAdmin />}
			{indexTabSelected == 1 && sessionDataStorage?.rol == "ADMINISTRADOR" && <TabRegistroDescansosAdmin />}
		</Box>
	);
};

export default Descansos;

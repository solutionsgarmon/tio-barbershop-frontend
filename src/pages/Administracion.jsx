import React from "react";
import Paperbase from "./admin/Paperbase";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../context/AppProvider";

const Administracion = ({ setShowNavigationBar }) => {
	const { setIsLoadingApp } = useAppContext();
	useEffect(() => {
		setShowNavigationBar(false);
		setIsLoadingApp(false);
		return () => {
			setShowNavigationBar(true);
		};
	}, []);

	return (
		<Box
			sx={{
				mt: -11,
				maxWidth: "100%",
				overflowX: "auto",
				backgroundColor: "#EEE",
			}}
		>
			<Paperbase />
		</Box>
	);
};

export default Administracion;

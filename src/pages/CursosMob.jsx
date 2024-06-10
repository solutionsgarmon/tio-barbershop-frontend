import React, { useEffect, useState } from "react";
import PostFullscreen from "../components/cards/PostFullscreen";
import { Box, Stack } from "@mui/material";
import { useAppContext } from "../context/AppProvider";
import { getCursos } from "../api/gets";

const Cursos = () => {
	const { setIsLoadingApp } = useAppContext();
	const [cursos, setCursos] = useState([]);
	useEffect(() => {
		async function fetchData() {
			setCursos(await getCursos());
			setIsLoadingApp(false);
		}

		fetchData();
	}, []);

	return (
		<Stack
			direction='column'
			sx={{
				textAlign: "center",
				m: "auto",
				mt: 3,
				mb: 5,
				maxWidth: { xs: 350, sm: 900 },
			}}
		>
			{cursos.map((curso) => {
				return <PostFullscreen curso={curso} />;
			})}
		</Stack>
	);
};

export default Cursos;

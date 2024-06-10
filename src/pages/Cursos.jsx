import React, { useEffect, useState } from "react";
import PostFullscreen from "../components/cards/PostFullscreen";
import PostFullscreenMob from "../components/cards/PostFullscreenMob";
import { Box, Stack } from "@mui/material";
import { useAppContext } from "../context/AppProvider";
import { getCursos } from "../api/gets";

const Cursos = () => {
	const { setIsLoadingApp, windowWidth } = useAppContext();
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

				maxWidth: { sm: "1000px" },
			}}
		>
			{cursos.map((curso) => {
				if (windowWidth > 800) return <PostFullscreen curso={curso} />;
				else return <PostFullscreenMob curso={curso} />;
			})}
		</Stack>
	);
};

export default Cursos;

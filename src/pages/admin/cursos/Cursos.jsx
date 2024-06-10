//TODO NO ESTA HECHO AUN
import React, { useState } from "react";
import { useAppContext } from "../../../context/AppProvider";
import TabCursos from "./TabCursos";
import TabImagenes from "./TabImagenes";

const COMPONENTS = [<TabCursos />, <TabImagenes />];

const Cursos = () => {
	const { indexTabSelected, setIndexTabSelected } = useAppContext();
	const [productSelected, setProductSelected] = useState(null);
	return (
		<div>
			{indexTabSelected == 0 && <TabCursos setProductSelected={setProductSelected} />}
			{indexTabSelected == 1 && <TabImagenes productSelected={productSelected} />}
		</div>
	);
};

export default Cursos;

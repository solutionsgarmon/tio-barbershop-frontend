import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { updateBarber, updateBarbershop } from "../../api/updates";
import { toast } from "react-toastify";
import { addToLocalStorage } from "../../helpers/localStorageHelper";

const IOSSwitch = styled((props) => <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />)(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#33cf4d",
			border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		boxSizing: "border-box",
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}));

export default function MySwitch() {
	const { sessionDataStorage, setSessionDataStorage } = useAppContext();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		console.log("sessionDataStorage?.descanso", sessionDataStorage?.descanso);
		if (sessionDataStorage?.descanso === "SI") {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [sessionDataStorage]);

	const handleChange = async () => {
		await handleUpdate();
	};

	const handleUpdate = async () => {
		const id = sessionDataStorage._id;
		console.log("id", id);
		console.log("sessionDataStorage.descanso", sessionDataStorage.descanso);
		let values;
		if (sessionDataStorage.descanso === "SI") {
			values = { descanso: "NO" };
		} else {
			values = { descanso: "SI" };
		}

		try {
			const resp = await updateBarber(values, id);
			console.log("resp mySwitch", resp);
			if (resp.data.success) {
				let newSessionDataStorage = { ...sessionDataStorage };
				newSessionDataStorage.descanso = sessionDataStorage.descanso === "SI" ? "NO" : "SI";
				addToLocalStorage("session", newSessionDataStorage);
				setSessionDataStorage(newSessionDataStorage);
				setChecked(newSessionDataStorage.descanso === "SI");
				if (newSessionDataStorage.descanso === "SI") {
					toast.success("Se modificó correctamente a NO Disponible");
					setChecked(true);
				} else {
					toast.success("Se modificó correctamente a Disponible");
					setChecked(false);
				}
			} else {
				toast.error("No se pudo modificar.");
			}
		} catch (error) {
			console.error("Error al modificar:", error);
			toast.error("Error al modificar.");
		}
	};

	return (
		<FormGroup>
			<FormControlLabel control={<IOSSwitch sx={{ m: 1 }} checked={!checked} onChange={handleChange} />} label={checked ? "Descansando" : "Disponible"} />
		</FormGroup>
	);
}

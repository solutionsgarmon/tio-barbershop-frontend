import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockIcon from "@mui/icons-material/Lock";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { postBarber } from "../../../api/posts";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { deleteBarber, deleteBarbershop, deleteService, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateBarber, updateBarbershop, updateProduct, updateService, updateUser } from "../../../api/updates";
import { getBarbers, getBarbershops } from "../../../api/gets";
import PasswordField from "../../../components/atoms/PasswordField";
import PasswordTypography from "../../../components/atoms/PasswordTypography";
import ChangePassword from "../../../components/modals/ChangePassword";
import { Typography } from "antd";

const Table = ({ setBarberSelected, modalOpen, setModalOpen }) => {
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [barbers, setBarbers] = useState([]);
	const { barbershops, setReload, sessionDataStorage } = useAppContext();
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setIsLoadingData(true);
			let barberos = await getBarbers();
			if (sessionDataStorage.rol == "BARBERO") {
				const barberoEncontrado = barberos.find((barbero) => sessionDataStorage._id === barbero._id);
				if (barberoEncontrado) {
					if (barberoEncontrado.esAdmin == "SI") setBarbers(barberos);
					else setBarbers([barberoEncontrado]);
				} else {
					setBarbers([]);
				}
			} else {
				setBarbers(barberos);
			}
			setIsLoadingData(false);
		}

		fetchData();
		setBarberSelected(null);
	}, []);

	const reloadData = async () => {
		setIsLoadingData(true);
		setSelectedRow(null);

		let barberos = await getBarbers();
		if (sessionDataStorage.rol == "BARBERO") {
			const barberoEncontrado = barberos.find((barbero) => sessionDataStorage._id === barbero._id);
			if (barberoEncontrado) {
				if (barberoEncontrado.esAdmin == "SI") setBarbers(barberos);
				else setBarbers([barberoEncontrado]);
			} else {
				setBarbers([]);
			}
		} else {
			setBarbers(barberos);
		}

		setReload((prev) => !prev);
		setIsLoadingData(false);
	};

	const propertiesToExcludeCreate = ["barberias_asignadas", "descanso", "estatus"];
	const propertiesToExcludeUpdate = ["barberias_asignadas", "password"];

	const columns = useMemo(
		() => [
			{
				accessorKey: "nombre",
				header: "Nombre",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "correo",
				header: "Correo Electrónico",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "esAdmin",
				header: "¿Es Admin?",
				editVariant: "select",
				editSelectOptions: ["NO", "SI"],
				muiEditTextFieldProps: {
					select: true,
					defaultValue: "SI", // Valor por defecto
				},
			},
			{
				accessorKey: "estatus",
				header: "Estatus",
				editVariant: "select",
				editSelectOptions: ["ACTIVO", "INACTIVO"],
				muiEditTextFieldProps: {
					required: true,
					select: true,
				},

				Cell: ({ cell }) => (
					<Typography
						style={{
							fontWeight: "bold",
							color: cell.getValue() === "ACTIVO" ? "green" : "red",
						}}
					>
						{cell.getValue()}
					</Typography>
				),
			},
			{
				accessorKey: "descanso",
				header: "En Descanso",
				editVariant: "select",
				editSelectOptions: ["NO", "SI"],
				muiEditTextFieldProps: {
					required: true,
					select: true,
				},
			},

			{
				accessorKey: "datos_personales.telefono",
				header: "Telefono/Celular",
			},

			{
				accessorKey: "barberias_asignadas",
				header: "Barberías asignadas",
				Cell: ({ cell }) => (
					<div>
						{cell.getValue().map((barberia, index) => (
							<Typography key={index}>{barberia.nombreBarberia}</Typography>
						))}
					</div>
				),
			},

			{
				accessorKey: "descripcion",
				header: "Descripción",
				Cell: ({ cell }) => cell.getValue().substring(0, 30) + "...",
			},
			{
				accessorKey: "password",
				header: "Contraseña",
				muiEditTextFieldProps: {
					required: true,
				},
				Cell: ({ cell }) => <PasswordTypography value={cell.getValue()} />,
			},
		],

		[validationErrors]
	);

	// CREATE ACTION //
	const handleCreate = async ({ values, table }) => {
		if (!verifyFormCreate(values)) {
			toast.error("Por favor complete los datos obligatorios");
			return;
		}
		setIsUpdateData(true); //loading button

		try {
			const resp = await postBarber(values);
			console.log("resp", resp.data.success);

			if (resp.data && resp.data.success) {
				console.log("Registro Exitoso");
				toast.success("Registro Exitoso");
				setIsLoadingData(true);

				await reloadData();
				table.setCreatingRow(null);
			} else {
				console.error("Error al crear Registro:", resp.data.error);
				toast.error("Error al crear Registro.");
				setIsLoadingData(false);
			}
		} catch (error) {
			console.error("Error en handleCreate():", error);
			toast.error("Verifique los datos y que el correo no haya sido agregado anteriormente.");
		} finally {
			setIsUpdateData(false);
		}
	};

	// UPDATE ACTION //
	const handleUpdate = async ({ values, row }) => {
		if (!verifyFormUpdate(values)) {
			toast.error("Por favor complete los datos obligatorios");
			return;
		}
		setIsUpdateData(true);

		try {
			const id = row.original._id;

			const resp = await updateBarber(values, id);

			if (resp.data.success) {
				toast.success("Se modificó correctamente.");
				table.setEditingRow(null);
				setIsLoadingData(false);
				await reloadData();
			} else {
				toast.error("No se pudo modificar.");
			}
		} catch (error) {
			console.error("Error en handleUpdate:", error);
			toast.error("Error al modificar el registro.");
		}
		setIsUpdateData(false);
	};

	//DELETE action
	const handleDelete = async (row) => {
		console.log("row", row.original);

		Swal.fire({
			title: "¿Estás seguro?",
			text: `Se eliminará el Barbero "${row.original.nombre}", ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const id = row.original._id;
					const resp = await deleteBarber(id);

					if (resp.data.success) {
						toast.success("Se eliminó correctamente.");
						await reloadData();
					} else {
						toast.error("No se pudo eliminar.");
					}
				} catch (error) {
					console.error("Error en handleDelete:", error);
					toast.error("Error al eliminar el registro.");
				}
			}
		});
	};

	//CLIC IN ROW
	const handleClickRow = (dataSelected) => {
		setSelectedRow(dataSelected);
		setBarberSelected(dataSelected);
		console.log("dataSelected", dataSelected);
		toast.success(`El barbero "${dataSelected.nombre}" fue Selecionado`);
	};

	//VERIFICAR FORMULARIO
	const verifyFormUpdate = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["correo"] || !values["password"]) return false;
		else return true;
	};

	const verifyFormCreate = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["correo"]) return false;
		else return true;
	};
	//CAMBIAR PASSWORD
	const handleChangePassword = (row) => {
		const id = row.original._id;
		console.log("row", id);
		setModalOpen(true);
	};

	const table = useMaterialReactTable({
		columns,
		data: barbers,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableEditing: true,
		localization: MRT_Localization_ES,
		muiTableBodyRowProps: ({ row }) => ({
			onClick: () => {
				handleClickRow(row.original);
			},
			sx: {
				backgroundColor: row.original === selectedRow ? "#E2b753 " : "inherit", // Aplica el color amarillo si la fila está seleccionada
				cursor: "pointer",
			},
		}),
		getRowId: (row) => row.id,
		muiTableContainerProps: {
			sx: {
				minHeight: "300px",
			},
		},
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreate,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleUpdate,
		// ======== PERSONALIZAR MODAL CREATE ======== //
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h4'>Nuevo</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					{internalEditComponents.map(
						(component) =>
							// Filtra las propiedades que no deseas mostrar en la edición
							!propertiesToExcludeCreate.some((prop) => component.key.includes(prop)) && <div key={component.key}>{component}</div>
					)}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions>
			</>
		),
		// ======== PERSONALIZAR MODAL UPDATE ======== //
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				{console.log("internalEditComponents", internalEditComponents)}
				<DialogTitle variant='h4'>Editar</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
					{internalEditComponents.map(
						(component) =>
							// Filtra las propiedades que no deseas mostrar en la edición
							!propertiesToExcludeUpdate.some((prop) => component.key.includes(prop)) && <div key={component.key}>{component}</div>
					)}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions>
			</>
		),
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex" }}>
				<Tooltip title='Editar'>
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Borrar'>
					<IconButton color='error' onClick={() => handleDelete(row)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Cambiar Contraseña'>
					<IconButton color='error' onClick={() => handleChangePassword(row)}>
						<LockResetIcon />
					</IconButton>
				</Tooltip>
			</Box>
		),
		renderTopToolbarCustomActions: ({ table }) => (
			<Box>
				<Tooltip title='Actualizar'>
					<IconButton
						onClick={async () => {
							await reloadData();
						}}
					>
						<RefreshIcon color='inherit' sx={{ display: "block" }} />
					</IconButton>
				</Tooltip>
				<Button
					sx={{ backgroundColor: "#E2b753" }}
					variant='contained'
					onClick={() => {
						table.setCreatingRow(true);
					}}
				>
					+ Agregar
				</Button>
			</Box>
		),
		state: {
			isLoading: isLoadingData,
			isSaving: isUpdateData,
			showProgressBars: isLoadingData,
		},
	});

	return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const TabBarbers = ({ setBarberSelected, setModalOpen, modalOpen }) => (
	<QueryClientProvider client={queryClient}>
		<Table setBarberSelected={setBarberSelected} modalOpen={modalOpen} setModalOpen={setModalOpen} />
	</QueryClientProvider>
);

export default TabBarbers;

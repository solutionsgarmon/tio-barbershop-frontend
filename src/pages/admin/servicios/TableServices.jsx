import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { postBarbershop, postServices, postUser } from "../../../api/posts";
import { deleteBarbershop, deleteService, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateBarbershop, updateProduct, updateService, updateUser } from "../../../api/updates";
import { getServices } from "../../../api/gets";

const ROLES = ["Cliente", "Barbero", "Administrador"];

const Table = ({ setServiceSelected }) => {
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [services, setServices] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setServices(await getServices());
		}
		fetchData();
		setIsLoadingData(false);
	}, []);

	const reloadData = async () => {
		setIsLoadingData(true);
		setServices(await getServices());
		setServiceSelected(null);
		setSelectedRow(null);
	};

	useEffect(() => {
		setIsLoadingData(false);
		setIsUpdateData(false);
	}, [services]);

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
				accessorKey: "duracion",
				header: "Duración (minutos)*",
			},

			{
				accessorKey: "categorias",
				header: "Categoría",
				editVariant: "multiSelect", // Configuración para selección múltiple
				editSelectOptions: ["CORTE", "AFEITADO", "MASAJE", "TRATAMIENTO", "DEPILACIÓN", "COLORACIÓN", "HOMBRE", "MUJER", "INFANTIL"],
				muiEditTextFieldProps: {
					required: true,
					select: true,
					multiple: true, // Permitir selección múltiple
				},
				// Formato de valor de la celda para mostrar como una lista de opciones seleccionadas
				Cell: ({ cell }) => {
					const value = cell.getValue();
					return value ? value.join(", ") : "";
				},
			},
			{
				accessorKey: "precio",
				header: "Precio",
			},
			{
				accessorKey: "descripcion",
				header: "Descripción",

				Cell: ({ cell }) => cell.getValue()?.slice(0, 20) + "..." || "",
			},
		],

		[validationErrors]
	);

	// CREATE ACTION //
	const handleCreateUser = async ({ values, table }) => {
		if (!verifyForm(values)) {
			return;
		}
		setIsUpdateData(true); //loading button

		try {
			const resp = await postServices(values);
			console.log("resp", resp.data.success);
			if (resp.data.success) {
				toast.success("Registro Exitoso");
				setIsLoadingData(true); //loading button
				await reloadData();
				table.setCreatingRow(null);
			} else {
				console.error("Error al crear Registro:", error);
				toast.error("Error al crear Registro.");
				setIsLoadingData(false);
			}
		} catch (error) {
			console.error("Error al crear Registro:", error);
			toast.error("Error al crear Registro.");
		}
		setIsUpdateData(true);
		setIsLoadingData(false);
	};

	// UPDATE ACTION //
	const handleUpdate = async ({ values, row }) => {
		if (!verifyForm(values)) {
			toast.error("Por favor complete los datos obligatorios");
			return;
		}
		console.log("values", values);
		setIsUpdateData(true);

		try {
			const id = row.original._id;
			const resp = await updateService(values, id);
			if (resp.data.success) {
				toast.success("Se modificó correctamente.");
				table.setEditingRow(null);
				setIsLoadingData(true);
				await reloadData();
			} else {
				toast.error("No se pudo modificar.");
			}
		} catch (error) {
			console.error("Error al modificar:", error);
			toast.error("No se pudo modificar, verifica que los datos sean correctos.");
		}
		setIsUpdateData(false);
	};

	//DELETE action
	const handleDelete = (row) => {
		console.log("row", row.original);
		Swal.fire({
			title: "¿Estás seguro?",
			text: `Se eliminará el servicio "${row.original.nombre}", ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const id = row.original._id;
					const resp = await deleteService(id);
					if (resp.data.success) {
						toast.success("Se eliminó correctamente.");
						await reloadData();
					} else toast.error("No se pudo eliminar.");
				} catch (error) {
					console.error("Error al eliminar:", error);
					toast.error("Error al eliminar.");
				}
			}
		});
	};

	//VERIFICAR FORMULARIO
	const verifyForm = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["categorias"] || !values["duracion"]) {
			toast.warning("Por favor ingresa los datos obligatorios");
			return false;
		}
		if (isNaN(values["duracion"]) || isNaN(values["precio"])) {
			toast.warning("Por favor ingresa números en duración y precio");
			return false;
		}

		return true;
	};

	//CLIC IN ROW
	const handleClickRow = (dataSelected) => {
		setSelectedRow(dataSelected);
		// console.log("dataSelected", dataSelected);
		setServiceSelected(dataSelected);
		toast.success(`El servicio "${dataSelected.nombre}" fué Selecionado`);
	};

	const table = useMaterialReactTable({
		columns,
		data: services,
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
				cursor: "pointer",
			},
		},
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateUser,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleUpdate,
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h4'>Nuevo</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>{internalEditComponents}</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions>
			</>
		),
		//optionally customize modal content
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h4'>Editar</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
					{internalEditComponents} {/* or render custom edit components here */}
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

const TableServices = ({ setServiceSelected }) => (
	<QueryClientProvider client={queryClient}>
		<Table setServiceSelected={setServiceSelected} />
	</QueryClientProvider>
);

export default TableServices;

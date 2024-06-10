import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";

import { deleteCita, deleteCurso, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";

import { getCursos } from "../../../api/gets";
import CrearNuevoCurso from "../../../components/modals/CrearNuevoCurso";

const Example = ({ setProductSelected }) => {
	const { setIsLoadingApp, sessionDataStorage } = useAppContext();
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [cursos, setCitas] = useState([]);
	const [reload, setReload] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [dataSelected, setDataSelected] = useState(null);
	const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const cursos = await getCursos();
			setCitas(cursos);
			setIsLoadingApp(false);
		}
		setIsLoadingApp(true);
		fetchData();
	}, [sessionDataStorage, reload]);

	useEffect(() => {
		setIsLoadingUsers(false);
	}, [cursos]);

	// const propertiesToExcludeCreate = ["mrt-row-create_password"];
	const propertiesToExcludeCreate = ["imagenes"];
	const propertiesToExcludeUpdate = ["imagenes"];

	const columns = useMemo(
		() => [
			{
				accessorKey: "isOnlyImage",
				header: "Solo imagen",
				Cell: ({ cell }) => (cell.row.original.isOnlyImage ? "SI" : "NO"),
				muiEditTextFieldProps: {
					required: true,
				},
				size: 50,
			},
			{
				accessorKey: "imagenes",
				header: "Imagenes",
				Cell: ({ cell }) => (
					<Stack direction='row' spacing={1}>
						{cell.row.original.imagenes.map((image, index) => (
							<Avatar key={index} sx={{ width: 50, height: 40, borderRadius: 0.5, border: 1 }} src={image.url} />
						))}
					</Stack>
				),
				muiEditTextFieldProps: {
					required: true,
				},
				size: 50,
			},
			{
				accessorKey: "nombre",
				header: "Nombre",
				muiEditTextFieldProps: {
					required: true,
				},
			},

			{
				accessorKey: "fecha_inicio",
				header: "Fecha Inicio",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "fecha_fin",
				header: "Fecha Fin",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "costo",
				header: "Costo",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "barbero",
				header: "Barbero",
				Cell: ({ cell }) => cell.row.original.barbero?.nombre,
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "barbershop",
				header: "Barbería",
				Cell: ({ cell }) => cell.row.original.barbershop?.nombre,
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "descripcion",
				header: "Descripción",
				size: 600,
			},
		],
		[validationErrors]
	);

	const handleCloseModal = () => {
		setReload((prev) => !prev);
		setModalOpen(false);
	};

	// UPDATE ACTION //
	const handleSave = async ({ values, row }) => {};

	//DELETE action
	const handleDelete = (row) => {
		console.log("row", row.original);
		Swal.fire({
			title: "¿Estás seguro?",
			text: `Se eliminará el Curso seleccionado, ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					console.log("row.original", row.original);
					const resp = await deleteCurso(row.original._id);
					//console.log("resp", resp);
					toast.success("Se eliminó correctamente");
					handleReloadData();
				} catch (e) {
					console.log("Error en handleDelete", e);
				}
			}
		});
	};

	//CLIC IN ROW
	const handleClickRow = (dataSelected) => {
		setDataSelected(dataSelected);
		setProductSelected(dataSelected);
		console.log("dataSelected", dataSelected);
		toast.success(`Seleccionaste un Curso`);
	};

	const handleReloadData = async () => {
		setIsLoadingUsers(true);
		setReload(!reload);
	};

	const table = useMaterialReactTable({
		columns,
		data: cursos,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableEditing: true,
		localization: MRT_Localization_ES,
		muiTableBodyRowProps: ({ row }) => ({
			onClick: () => {
				handleClickRow(row.original);
			},
			sx: {
				backgroundColor: row.original === dataSelected ? "#E2b753 " : "inherit", // Aplica el color amarillo si la fila está seleccionada
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

		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSave,
		//optionally customize modal content
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h4'>Crear Usuario</DialogTitle>
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
		//optionally customize modal content
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h4'>Editar Curso</DialogTitle>
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
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title='Edit'>
					<IconButton
						onClick={() => {
							setModalOpen(true);
							setDataSelected(row.original);
							setIsUpdate(true);
						}}
					>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Eliminar'>
					<IconButton sx={{ ml: -3 }} color='error' onClick={() => handleDelete(row)}>
						<DeleteIcon x={{ ml: -3 }} />
					</IconButton>
				</Tooltip>
			</Box>
		),
		renderTopToolbarCustomActions: ({ table }) => (
			<Box>
				<Tooltip title='Actualizar'>
					<IconButton onClick={handleReloadData}>
						<RefreshIcon color='inherit' sx={{ display: "block" }} />
					</IconButton>
				</Tooltip>
				<Button
					sx={{ backgroundColor: "#E2b753" }}
					variant='contained'
					onClick={() => {
						setModalOpen(true);
						setIsUpdate(false);
					}}
				>
					+ Agregar
				</Button>
			</Box>
		),
		state: {
			isLoading: isLoadingUsers,
			isSaving: isUpdateData,
			// showAlertBanner: isLoadingUsersError,
			showProgressBars: isLoadingUsers,
		},
	});

	return (
		<>
			<MaterialReactTable table={table} setProductSelected={setProductSelected} /> <CrearNuevoCurso open={modalOpen} handleClose={handleCloseModal} curso={dataSelected} isUpdate={isUpdate} />
		</>
	);
};

const queryClient = new QueryClient();

const TabCursos = ({ setProductSelected }) => (
	<QueryClientProvider client={queryClient}>
		<Example setProductSelected={setProductSelected} />
	</QueryClientProvider>
);

export default TabCursos;

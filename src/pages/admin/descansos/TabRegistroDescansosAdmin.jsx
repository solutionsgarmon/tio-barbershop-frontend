import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { deleteCitaRegistro, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateCita, updateCitaRegistro, updateUser } from "../../../api/updates";
import EditIcon from "@mui/icons-material/Edit";
import { getCitas, getCitasByIdBarbero, getCitasCanceladasByIdBarbero, getCitasCompletadasByIdBarbero, getCitasRegistro, getUsers } from "../../../api/gets";

const Example = () => {
	const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [citasdescansos, setCitasdescansos] = useState([]);
	const [reload, setReload] = useState(false);
	const [isBarber, setIsBarber] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		async function fetchData() {
			//FILTRAR CITAS QUE SEAN DESCANSOS

			const citasRegistro = await getCitasRegistro();
			// const combinacion = [...citasPendientes, ...citasRegistro];
			const descansos = citasRegistro.filter((cita) => cita.tipo_cita == "DESCANSO");
			setCitasdescansos(descansos);

			console.log("descansos", descansos);
		}

		fetchData();
	}, [sessionDataStorage, reload]);

	useEffect(() => {
		setIsLoadingUsers(false);
	}, [citasdescansos]);

	const propertiesToExcludeCreate = ["estatus"];
	const propertiesToExcludeUpdate = ["estatus"];

	const columns = useMemo(
		() => [
			{
				accessorKey: "estatus",
				header: "Estatus",
			},

			{
				accessorKey: "nombre_barbero_asignado",
				header: "Barbero",
				muiEditTextFieldProps: {
					required: true,
				},
			},

			{
				accessorKey: "hora_inicio_asignada",
				header: "Hora Inicio",
				muiEditTextFieldProps: {
					required: true,
				},
			},

			{
				accessorKey: "hora_fin_asignada",
				header: "Hora Fin",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "fecha_asignada",
				header: "Fecha Inicio",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "fecha_asignada_fin",
				header: "Fecha Fin",
				muiEditTextFieldProps: {
					required: true,
				},
			},
		],
		[validationErrors]
	);

	// UPDATE ACTION //
	const handleSave = async ({ values, row }) => {
		if (!verifyForm(values)) {
			return;
		}
		setIsUpdateData(true);
		const id = row.original._id;
		const resp = await updateCitaRegistro(values, id);

		if (resp.data.success) toast.success("Se modificó correctamente.");
		else toast.error("No se pudo modificar.");
		setIsUpdateData(false);
		await handleReloadData();
		setValidationErrors({});
		table.setEditingRow(null);
	};

	//DELETE action
	const handleDelete = (row) => {
		console.log("row", row.original);
		Swal.fire({
			title: "¿Estás seguro?",
			text: `Se eliminará el Registro de Descanso , ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const resp = await deleteCitaRegistro(row.original._id);
				toast.success("Se eliminó correctamente.");

				await handleReloadData();
			}
		});
	};

	const verifyForm = (values) => {
		if (!values["fecha_asignada"] || !values["fecha_asignada_fin"] || !values["hora_fin_asignada"] || !values["hora_inicio_asignada"]) {
			toast.warning("Debes ingresar todos los campos obligatorios");
			return false;
		} else return true;
	};

	const handleReloadData = async () => {
		setIsLoadingUsers(true);
		setReload(!reload);
	};

	const table = useMaterialReactTable({
		columns,
		data: citasdescansos,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableEditing: true,
		localization: MRT_Localization_ES,
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
				<DialogTitle variant='h4'>Editar Registro</DialogTitle>
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
				<Tooltip title='Modificar'>
					<IconButton sx={{ mx: -0.8 }} onClick={() => table.setEditingRow(row)}>
						<EditIcon sx={{ mx: -0.8 }} />
					</IconButton>
				</Tooltip>
				<Tooltip title='Eliminar'>
					<IconButton sx={{ mx: -0.8 }} color='error' onClick={() => handleDelete(row)}>
						<DeleteIcon sx={{ mx: -0.8 }} />
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
				{/* <Button
					sx={{ backgroundColor: "#E2b753" }}
					variant='contained'
					onClick={() => {
						table.setCreatingRow(true); //simplest way to open the create row modal with no default values
						//or you can pass in a row object to set default values with the `createRow` helper function
						// table.setCreatingRow(
						//   createRow(table, {
						//     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
						//   }),
						// );
					}}
				>
					+ Agregar
				</Button> */}
			</Box>
		),
		state: {
			isLoading: isLoadingUsers,
			isSaving: isUpdateData,
			// showAlertBanner: isLoadingUsersError,
			showProgressBars: isLoadingUsers,
		},
	});

	return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const TabRegistroDescansosAdmin = () => (
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default TabRegistroDescansosAdmin;

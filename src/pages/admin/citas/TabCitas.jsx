import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { postUser } from "../../../api/posts";
import { deleteCita, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateCita, updateProduct, updateUser } from "../../../api/updates";
import { getCitas, getCitasByIdBarbero, getCitasCanceladasByIdBarbero, getCitasCompletadasByIdBarbero, getCitasRegistro, getUsers } from "../../../api/gets";

const ROLES = ["Cliente", "Barbero", "Administrador"];

const Example = () => {
	const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [citas, setCitas] = useState([]);
	const [reload, setReload] = useState(false);
	const [isBarber, setIsBarber] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		async function fetchData() {
			if (sessionDataStorage?.rol == "BARBERO") {
				if (sessionDataStorage.esAdmin == "NO") {
					//ES BARBERO
					setIsBarber(true);
					const citasPendientes = await getCitasByIdBarbero(sessionDataStorage._id);
					const citasCanceladas = await getCitasCanceladasByIdBarbero(sessionDataStorage._id);
					const citasCompletadas = await getCitasCompletadasByIdBarbero(sessionDataStorage._id);

					const combinedCitas = [...citasPendientes, ...citasCanceladas, ...citasCompletadas];
					const combinedCitasFiltradas = combinedCitas.filter((cita) => cita.tipo_cita == "CITA");
					setCitas(combinedCitasFiltradas);
				} else {
					//ES BARBERO-ADMIN
					setIsAdmin(true);
					const citas = await getCitas();
					const citasFiltradas = citas.filter((cita) => cita.tipo_cita == "CITA");
					setCitas(citasFiltradas);
				}
			} else {
				//ES ADMIN
				setIsAdmin(true);
				const citas = await getCitas();
				const citasFiltradas = citas.filter((cita) => cita.tipo_cita == "CITA");
				setCitas(citasFiltradas);
			}
			setIsLoadingApp(false);
		}

		setIsLoadingApp(true);
		fetchData();
	}, [sessionDataStorage, reload]);

	useEffect(() => {
		setIsLoadingUsers(false);
	}, [citas]);

	// const propertiesToExcludeCreate = ["mrt-row-create_password"];
	const propertiesToExcludeCreate = ["fecha_actualizacion", "recordatorio", "datos_cliente"];
	const propertiesToExcludeUpdate = ["estatus"];

	const columns = useMemo(
		() => [
			{
				accessorKey: "datos_cliente.nombre",
				header: "Cliente",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "estatus",
				header: "Estatus",
			},

			{
				accessorKey: "nombre_servicio_asignado",
				header: "Servicio",
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
				accessorKey: "nombre_barbero_asignado",
				header: "Barbero",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "nombre_barberia_asignada",
				header: "Barberia",
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
				header: "Fecha",
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
		const idCita = row.original._id;
		const resp = await updateCita(values, idCita);
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
			text: `Se eliminará la cita seleccionada, ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const resp = await deleteCita(row.original._id);
					//console.log("resp", resp);
					toast.success("Se eliminó correctamente");
					handleReloadData();
				} catch (e) {
					console.log("Error en handleDelete", e);
				}
			}
		});
	};

	const verifyForm = (values) => {
		if (
			!values["costo"] ||
			!values["datos_cliente.nombre"] ||
			!values["fecha_asignada"] ||
			!values["hora_fin_asignada"] ||
			!values["hora_inicio_asignada"] ||
			!values["nombre_barberia_asignada"] ||
			!values["nombre_barbero_asignado"] ||
			!values["nombre_servicio_asignado"]
		) {
			toast.info("Debe ingresar todos los campos");
			return false;
		} else return true;
	};

	const handleReloadData = async () => {
		setIsLoadingUsers(true);
		setReload(!reload);
	};

	const table = useMaterialReactTable({
		columns,
		data: citas,
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
				<DialogTitle variant='h4'>Editar Usuario</DialogTitle>
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
				{isAdmin && (
					<>
						<Tooltip title='Edit'>
							<IconButton sx={{ mx: -0.7 }} onClick={() => table.setEditingRow(row)}>
								<EditIcon sx={{ mx: -0.7 }} />
							</IconButton>
						</Tooltip>
						<Tooltip title='Eliminar'>
							<IconButton sx={{ mx: -0.7 }} color='error' onClick={() => handleDelete(row)}>
								<DeleteIcon x={{ mx: -0.7 }} />
							</IconButton>
						</Tooltip>
					</>
				)}
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
          variant="contained"
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

const TabCitas = () => (
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default TabCitas;

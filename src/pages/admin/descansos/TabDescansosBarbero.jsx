import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateUser } from "../../../api/updates";
import { getCitas, getCitasByIdBarbero, getCitasCanceladasByIdBarbero, getCitasCompletadasByIdBarbero, getCitasRegistro, getUsers } from "../../../api/gets";

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
					setIsBarber(true);
					const citasPendientes = await getCitasByIdBarbero(sessionDataStorage._id);
					const citasCanceladas = await getCitasCanceladasByIdBarbero(sessionDataStorage._id);
					const citasCompletadas = await getCitasCompletadasByIdBarbero(sessionDataStorage._id);

					const combinedCitas = [...citasPendientes, ...citasCanceladas, ...citasCompletadas];
					//FILTRAR CITAS QUE SEAN DESCANSOS
					const descansos = combinedCitas.filter((cita) => cita?.tipo_cita == "DESCANSO");
					console.log("descansos", descansos);
					setCitas(descansos);
				} else {
					setIsAdmin(true);
					setCitas(await getCitas());
				}
			}
		}

		fetchData();
	}, [sessionDataStorage, reload]);

	useEffect(() => {
		setIsLoadingUsers(false);
	}, [citas]);

	const propertiesToExcludeCreate = ["fecha_actualizacion", "recordatorio", "datos_cliente"];
	const propertiesToExcludeUpdate = ["fecha_actualizacion", "recordatorio", "datos_cliente"];

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
			toast.error("Por favor complete los datos obligatorios");
			return;
		}
		setIsUpdateData(true);
		const idUser = row.original._id;
		const resp = await updateUser(values, idUser);

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
			text: `Se eliminará el Usuario "${row.original.name}", ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const resp = await deleteUser(row.original._id);
				toast.success("Se eliminó correctamente.");

				await handleReloadData();
			}
		});
	};

	const verifyForm = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["correo"] || !values["password"]) return false;
		else return true;
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
						{" "}
						{/* <Tooltip title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip> */}
						<Tooltip title='Eliminar'>
							<IconButton color='error' onClick={() => handleDelete(row)}>
								<DeleteIcon />
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

const TabDescansosBarbero = () => (
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default TabDescansosBarbero;

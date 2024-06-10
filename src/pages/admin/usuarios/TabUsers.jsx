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
import { deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateProduct, updateUser } from "../../../api/updates";
import { getUsers } from "../../../api/gets";
import PasswordTypography from "../../../components/atoms/PasswordTypography";

const ROLES = ["Cliente", "Barbero", "Administrador"];

const Example = () => {
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setUsers(await getUsers());
		}
		fetchData();
	}, []);

	useEffect(() => {
		setIsLoadingUsers(false);
	}, [users]);

	const propertiesToExcludeCreate = [];
	const propertiesToExcludeUpdate = ["password"];

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
				header: "Email",
				muiEditTextFieldProps: {
					required: true,
				},
			},
			{
				accessorKey: "password",
				header: "Password",
				muiEditTextFieldProps: {
					required: true,
				},
				Cell: ({ cell }) => <PasswordTypography value={cell.getValue()} />,
			},
		],
		[validationErrors]
	);

	// CREATE ACTION //
	const handleCreateUser = async ({ values, table }) => {
		if (!verifyFormCreate(values)) {
			toast.error("Por favor complete los datos obligatorios");
			return;
		}

		try {
			const resp = await postUser(values);
			console.log("resp", resp.data.success);
			if (resp.data.success) toast.success("Se registró correctamente.");
			else toast.error("Error al crear usuario.");
			await handleReloadData();
			table.setCreatingRow(null);
		} catch (error) {
			console.error("Error al crear el usuario:", error);
		} finally {
			setIsUpdateData(false);
		}
		setValidationErrors({});
	};

	// UPDATE ACTION //
	const handleSaveUser = async ({ values, row }) => {
		if (!verifyFormUpdate(values)) {
			toast.error("Por favor complete los datos obligatorios");
			return;
		}
		setIsUpdateData(true);
		const idUser = row.original._id;

		const valuesSinPassword = {
			correo: values.correo,
			nombre: values.nombre,
		};
		console.log("values", valuesSinPassword);
		setIsUpdateData(true);
		const resp = await updateUser(valuesSinPassword, idUser);

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
				if (resp.data.success) toast.success("Se eliminó correctamente.");
				else toast.error("No se pudo eliminar.");

				await handleReloadData();
			}
		});
	};

	const verifyFormCreate = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["correo"] || !values["password"]) return false;
		else return true;
	};

	const verifyFormUpdate = (values) => {
		console.log("values", values);
		if (!values["nombre"] || !values["correo"]) return false;
		else return true;
	};

	const handleReloadData = async () => {
		setIsLoadingUsers(true);
		setUsers(await getUsers());
	};

	const table = useMaterialReactTable({
		columns,
		data: users,
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
		onCreatingRowSave: handleCreateUser,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveUser,
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
				<Tooltip title='Edit'>
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Delete'>
					<IconButton color='error' onClick={() => handleDelete(row)}>
						<DeleteIcon />
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

	return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const TabUsers = () => (
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default TabUsers;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
	!!email.length && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function validateUser(user) {
	return {
		firstName: !validateRequired(user.firstName) ? "First Name is Required" : "",
		lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
		email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
	};
}

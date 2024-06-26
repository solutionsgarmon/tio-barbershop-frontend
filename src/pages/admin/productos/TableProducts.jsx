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
import { postBarbershop, postProduct, postServices, postUser } from "../../../api/posts";
import { deleteBarbershop, deleteProduct, deleteService, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import { updateBarbershop, updateProduct, updateService, updateUser } from "../../../api/updates";
import { getProducts } from "../../../api/gets";

const ROLES = ["Cliente", "Barbero", "Administrador"];

const Table = ({ setProductSelected }) => {
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
	const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
	const [products, setProducts] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setProducts(await getProducts());
		}
		fetchData();
		setIsLoadingData(false);
	}, []);

	const reloadData = async () => {
		setSelectedRow(null);
		setIsLoadingData(true);
		setProducts(await getProducts());
	};

	useEffect(() => {
		setIsLoadingData(false);
		setIsUpdateData(false);
	}, [products]);

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
				accessorKey: "precio",
				header: "Precio",
				size: 50,
			},
			{
				accessorKey: "descripcion",
				header: "Descripción",
				size: 200,
				Cell: ({ cell }) => <Tooltip title={cell.getValue()}>{cell.getValue()?.slice(0, 20) + "..." || ""}</Tooltip>,
			},
			// {
			//   accessorKey: "stock",
			//   header: "Stock",
			// },
			// {
			//   accessorKey: "categoria",
			//   header: "Categoría",
			// },
			// {
			//   accessorKey: "marca",
			//   header: "Marca",
			// },
		],

		[validationErrors]
	);

	// CREATE ACTION //
	const handleCreate = async ({ values, table }) => {
		setIsUpdateData(true); //loading button

		try {
			const resp = await postProduct(values);
			console.log("resp", resp.data.success);
			if (resp.data.success) {
				toast.success("Registro Exitoso");

				await reloadData();

				table.setCreatingRow(null);
			} else {
				console.error("Error al crear Registro:");
				toast.error("Error al crear Registro.");
			}
		} catch (e) {
			toast.error("No se pudo crear, revisa los datos");

			console.log("Error en handle]create", e);
		}
		//loading button
		setIsLoadingData(false);
		setIsUpdateData(false);
	};

	// UPDATE ACTION //
	const handleUpdate = async ({ values, row }) => {
		console.log("values", values);
		setIsUpdateData(true);
		const id = row.original._id;
		const resp = await updateProduct(values, id);
		if (resp.data.success) {
			toast.success("Se modificó correctamente.");
			table.setEditingRow(null);
			setIsLoadingData(false);
			setIsUpdateData(false);
			await reloadData();
		} else {
			toast.error("No se pudo modificar.");
			setIsUpdateData(false);
			setIsUpdateData(false);
		}
	};

	//DELETE action
	const handleDelete = (row) => {
		console.log("row", row.original);
		Swal.fire({
			title: "¿Estás seguro?",
			text: `Se eliminará el producto "${row.original.nombre}", ¿Desea continuar?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const id = row.original._id;
				const resp = await deleteProduct(id);
				if (resp.data.success) {
					toast.success("Se eliminó correctamente.");
					await reloadData();
				} else toast.error("No se pudo eliminar.");
			}
		});
	};

	//CLIC IN ROW
	const handleClickRow = (dataSelected) => {
		// console.log("dataSelected", dataSelected);
		setSelectedRow(dataSelected);
		setProductSelected(dataSelected);
		toast.success(`El servicio "${dataSelected.nombre}" fué Selecionado`);
	};

	const table = useMaterialReactTable({
		columns,
		data: products,
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
		onCreatingRowSave: handleCreate,
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

const TableProducts = ({ setProductSelected }) => (
	<QueryClientProvider client={queryClient}>
		<Table setProductSelected={setProductSelected} />
	</QueryClientProvider>
);

export default TableProducts;

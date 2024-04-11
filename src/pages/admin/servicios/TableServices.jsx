import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppContext } from "../../../context/AppProvider";
import { postBarbershop, postServices, postUser } from "../../../api/posts";
import {
  deleteBarbershop,
  deleteService,
  deleteUser,
} from "../../../api/deletes";
import Swal from "sweetalert2";
import {
  updateBarbershop,
  updateProduct,
  updateService,
  updateUser,
} from "../../../api/updates";
import { getServices } from "../../../api/gets";

const ROLES = ["Cliente", "Barbero", "Administrador"];

const Table = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
  const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
  const [services, setServices] = useState([]);

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
  };

  useEffect(() => {
    setIsLoadingData(false);
    setIsUpdateData(false);
  }, [services]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tipo",
        header: "Tipo",
        muiEditTextFieldProps: {
          required: true,
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
    setIsUpdateData(true); //loading button

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
  };

  // UPDATE ACTION //
  const handleUpdate = async ({ values, row }) => {
    console.log("values", values);
    setIsUpdateData(true);
    const id = row.original._id;
    const resp = await updateService(values, id);
    if (resp.data.success) {
      toast.success("Se modificó correctamente.");
      table.setEditingRow(null);
      setIsLoadingData(true);
      await reloadData();
    } else {
      toast.error("No se pudo modificar.");
      setIsUpdateData(false);
    }
  };

  //DELETE action
  const handleDelete = (row) => {
    console.log("row", row.original);
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará la Barbería "${row.original.nombre}", ¿Desea continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = row.original._id;
        const resp = await deleteService(id);
        if (resp.data.success) {
          toast.success("Se eliminó correctamente.");
          await reloadData();
        } else toast.error("No se pudo eliminar.");
      }
    });
  };

  const table = useMaterialReactTable({
    columns,
    data: services,
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
    onEditingRowSave: handleUpdate,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Nuevo</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Editar</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box>
        <Tooltip title="Actualizar">
          <IconButton
            onClick={async () => {
              await reloadData();
            }}
          >
            <RefreshIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
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

const TableServices = () => (
  <QueryClientProvider client={queryClient}>
    <Table />
  </QueryClientProvider>
);

export default TableServices;

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
import { postBarber } from "../../../api/posts";
import {
  deleteBarber,
  deleteBarbershop,
  deleteService,
  deleteUser,
} from "../../../api/deletes";
import Swal from "sweetalert2";
import {
  updateBarber,
  updateBarbershop,
  updateProduct,
  updateService,
  updateUser,
} from "../../../api/updates";
import { getBarbers } from "../../../api/gets";

const ESTADO = ["Activo", "Inactivo"];
const Table = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
  const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setBarbers(await getBarbers());
    }
    fetchData();
    setIsLoadingData(false);
  }, []);

  const reloadData = async () => {
    setIsLoadingData(true);
    setBarbers(await getBarbers());
  };

  useEffect(() => {
    setIsLoadingData(false);
    setIsUpdateData(false);
  }, [barbers]);

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
        accessorKey: "email",
        header: "Correo Electrónico",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "barberia_asignada",
        header: "Barbería asignada",
      },
      {
        accessorKey: "estado",
        header: "Estado",
        editVariant: "select",
        editSelectOptions: ESTADO,
        muiEditTextFieldProps: {
          select: true,
        },
      },
      {
        accessorKey: "descanso",
        header: "En Descanso",
        editVariant: "select",
        editSelectOptions: ["S", "N"],
        muiEditTextFieldProps: {
          select: true,
        },
      },
    ],

    [validationErrors]
  );

  // CREATE ACTION //
  const handleCreate = async ({ values, table }) => {
    setIsUpdateData(true); //loading button

    const resp = await postBarber(values);
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
    const resp = await updateBarber(values, id);
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
      text: `Se eliminará el Barbero "${row.original.nombre}", ¿Desea continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = row.original._id;
        const resp = await deleteBarber(id);
        if (resp.data.success) {
          toast.success("Se eliminó correctamente.");
          await reloadData();
        } else toast.error("No se pudo eliminar.");
      }
    });
  };

  const table = useMaterialReactTable({
    columns,
    data: barbers,
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
    onCreatingRowSave: handleCreate,
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

const TabBarbers = () => (
  <QueryClientProvider client={queryClient}>
    <Table />
  </QueryClientProvider>
);

export default TabBarbers;

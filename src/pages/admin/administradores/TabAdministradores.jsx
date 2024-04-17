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
import { postAdmin, postBarber } from "../../../api/posts";
import {
  deleteAdmin,
  deleteBarber,
  deleteBarbershop,
  deleteService,
  deleteUser,
} from "../../../api/deletes";
import Swal from "sweetalert2";
import {
  updateAdmin,
  updateBarber,
  updateBarbershop,
  updateProduct,
  updateService,
  updateUser,
} from "../../../api/updates";
import { getAdmins } from "../../../api/gets";
import PasswordTypography from "../../../components/atoms/PasswordTypography";

const Table = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
  const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setAdmins(await getAdmins());
    }
    fetchData();
    setIsLoadingData(false);
  }, []);

  const reloadData = async () => {
    setIsLoadingData(true);
    setAdmins(await getAdmins());
  };

  useEffect(() => {
    setIsLoadingData(false);
    setIsUpdateData(false);
  }, [admins]);

  // const propertiesToExcludeCreate = ["mrt-row-create_password"];
  const propertiesToExcludeCreate = [""];
  const propertiesToExcludeUpdate = ["0_password"];
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
  const handleCreate = async ({ values, table }) => {
    if (!verifyForm(values)) {
      toast.error("Por favor complete los datos obligatorios");
      return;
    }
    setIsUpdateData(true); //loading button

    try {
      const resp = await postAdmin(values);
      console.log("resp", resp.data.success);
      if (resp.data.success) {
        toast.success("Registro Exitoso");
        setIsLoadingData(true); //loading button
        await reloadData();
        table.setCreatingRow(null);
      } else {
        console.error("Error al crear Registro:", resp.data.error);
        toast.error("Error al crear Registro.");
        setIsLoadingData(false);
      }
    } catch (error) {
      console.error("Error en handleCreate:", error);
      toast.error("Error al crear Registro.");
      setIsLoadingData(false);
    } finally {
      setIsUpdateData(false);
    }
  };

  // UPDATE ACTION //
  const handleUpdate = async ({ values, row }) => {
    if (!verifyForm(values)) {
      toast.error("Por favor complete los datos obligatorios");
      return;
    }
    console.log("values", values);
    setIsUpdateData(true);
    const id = row.original._id;

    try {
      const resp = await updateAdmin(values, id);
      if (resp.data.success) {
        toast.success("Se modificó correctamente.");
        table.setEditingRow(null);
        setIsLoadingData(true);
        await reloadData();
      } else {
        toast.error("No se pudo modificar.");
        setIsUpdateData(false);
      }
    } catch (error) {
      console.error("Error en handleUpdate:", error);
      toast.error("Error al modificar el registro.");
      setIsUpdateData(false);
    }
  };

  // DELETE action
  const handleDelete = async (row) => {
    console.log("row", row.original);
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el Administrador "${row.original.nombre}", ¿Desea continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = row.original._id;

        try {
          const resp = await deleteAdmin(id);
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

  const verifyForm = (values) => {
    console.log("values", values);
    if (!values["nombre"] || !values["correo"] || !values["password"])
      return false;
    else return true;
  };

  const table = useMaterialReactTable({
    columns,
    data: admins,
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
          {internalEditComponents.map(
            (component) =>
              // Filtra las propiedades que no deseas mostrar en la edición
              !propertiesToExcludeCreate.includes(component.key) && (
                <div key={component.accessorKey}>{component}</div>
              )
          )}
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
          {internalEditComponents.map(
            (component) =>
              // Filtra las propiedades que no deseas mostrar en la edición
              !propertiesToExcludeUpdate.includes(component.key) && (
                <div key={component.accessorKey}>{component}</div>
              )
          )}
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

const TabAdministradores = () => (
  <QueryClientProvider client={queryClient}>
    <Table />
  </QueryClientProvider>
);

export default TabAdministradores;

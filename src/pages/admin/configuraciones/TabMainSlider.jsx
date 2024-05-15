import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ToastContainer, toast } from "react-toastify";

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Avatar,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Swal from "sweetalert2";
import {
  updateAppSettings,
  updateProduct,
  updateUser,
} from "../../../api/updates";

import ModalUpdateMainSlider from "./modales/ModalUpdateMainSlider";
import { getAppSettings } from "../../../api/gets";
import { useAppContext } from "../../../context/AppProvider";
const Example = () => {
  const { isLoadingApp, setIsLoadingApp, sessionDataStorage } = useAppContext();
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false); //Bloquear la modal y boton
  const [appSettings, setAppSettings] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [reload, setReload] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const settings = await getAppSettings();
      setAppSettings(settings[0]);
      setDataTable(settings[0].main_slider);
      setIsLoadingUsers(false);
    }
    fetchData();
  }, [reload]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Imagen",
        size: 50,
        Cell: ({ cell }) => (
          <Avatar
            sx={{ width: 75, height: 50, m: -1, borderRadius: 1 }}
            src={cell.getValue()}
          />
        ),
      },
      {
        accessorKey: "principal_text",
        header: "Texto Principal",
      },

      {
        accessorKey: "secondary_text",
        header: "Texto Secundario",
      },
      {
        accessorKey: "buttonText",
        header: "Texto Botón",
      },
    ],
    [validationErrors]
  );

  // UPDATE BUTTON ACTION //
  const handleClickButtonUpdate = async (registro) => {
    console.log("handle Update");
    setIsUpdate(true);
    setIsCreate(false);
    setSelectedRow(registro);
    setOpenModalUpdate(true);
  };

  const handleClickButtonCreate = async () => {
    setIsUpdate(false);
    setIsCreate(true);
    setSelectedRow(null);
    setOpenModalUpdate(true);
  };

  const handleClickButtonDelete = async (row) => {
    console.log("handleClickButtonDelete()", row);

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el Banner Seleccionado, ¿Desea continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const idBanner = row._id;
        handleUpdate(idBanner);
      }
    });
  };

  const handleUpdate = async (idBanner) => {
    try {
      let bannersPrincipales = dataTable.filter((banner) => {
        return banner._id !== idBanner;
      });

      let values = {
        main_slider: bannersPrincipales,
      };
      const idAppSettings = appSettings._id;
      const resp = await updateAppSettings(values, idAppSettings);
      console.log("resp", resp);
      if (resp.data.success) {
        toast.success("Se Eliminó correctamente.");
        handleReloadData();
      } else {
        toast.error("No se pudo Eliminar.");
      }
    } catch (error) {
      toast.error("Error tratar de Eliminar.");
    }
  };

  const handleReloadData = async () => {
    setIsLoadingUsers(true);
    setReload(!reload);
  };

  const handleClose = () => {
    setOpenModalUpdate(false);
    handleReloadData();
  };

  const table = useMaterialReactTable({
    columns,
    data: dataTable,
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

    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Crear Usuario</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents.map(
            (component) =>
              // Filtra las propiedades que no deseas mostrar en la edición
              !propertiesToExcludeCreate.some((prop) =>
                component.key.includes(prop)
              ) && <div key={component.key}>{component}</div>
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
        <DialogTitle variant="h4">Editar Usuario</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents.map(
            (component) =>
              // Filtra las propiedades que no deseas mostrar en la edición
              !propertiesToExcludeUpdate.some((prop) =>
                component.key.includes(prop)
              ) && <div key={component.key}>{component}</div>
          )}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => handleClickButtonUpdate(row.original)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            color="error"
            onClick={() => handleClickButtonDelete(row.original)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box>
        <Tooltip title="Actualizar">
          <IconButton onClick={handleReloadData}>
            <RefreshIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar nuevo Banner">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E2b753" }}
            onClick={handleClickButtonCreate}
          >
            + Agregar
          </Button>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isUpdatingData,
      // showAlertBanner: isLoadingUsersError,
      showProgressBars: isLoadingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <ModalUpdateMainSlider
        open={openModalUpdate}
        handleClose={handleClose}
        selectedRow={selectedRow}
        appSettings={appSettings}
        isCreate={isCreate}
        isUpdate={isUpdate}
      />
    </>
  );
};

const queryClient = new QueryClient();

const TabMainSlider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default TabMainSlider;

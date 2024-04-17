import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { toast } from "react-toastify";

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
import { postBarbershop, postUser } from "../../../api/posts";
import { deleteBarbershop, deleteUser } from "../../../api/deletes";
import Swal from "sweetalert2";
import {
  updateBarbershop,
  updateProduct,
  updateUser,
} from "../../../api/updates";
import { getBarbershops } from "../../../api/gets";

const Table = ({ setBarbershopSelected, setReloadData, isLoading }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true); // poner loading girando
  const [isUpdateData, setIsUpdateData] = useState(false); //Bloquear la modal y boton
  const [barbershops, setBarbershops] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setBarbershops(await getBarbershops());
    }
    fetchData();
    setIsLoadingData(false);
  }, []);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  const reloadData = async () => {
    setReloadData((prev) => !prev);
  };

  useEffect(() => {
    setIsLoadingData(false);
    setIsUpdateData(false);
  }, [barbershops]);

  const propertiesToExcludeCreate = ["mrt-row-create_imagen"];
  const propertiesToExcludeUpdate = ["0_imagen"];

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
        size: 200,
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "direccion.calle",
        header: "Calle y Número",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "direccion.ciudad",
        header: "Ciudad",
      },
      {
        accessorKey: "direccion.colonia",
        header: "Colonia",
      },
      {
        accessorKey: "direccion.cp",
        header: "CP",
      },
      {
        accessorKey: "telefono",
        header: "Teléfono",
      },
      {
        accessorKey: "correo",
        header: "Correo",
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",

        Cell: ({ cell }) => cell.getValue()?.slice(0, 20) + "..." || "",
      },

      {
        accessorKey: "coordenadas.latitud",
        header: "Latitud (izquierda)",
      },
      {
        accessorKey: "coordenadas.longitud",
        header: "Longitud (derecha)",
      },
      {
        accessorKey: "imagen",
        header: "Imagen",
      },
    ],

    [validationErrors]
  );

  // CREATE ACTION //
  const handleCreateUser = async ({ values, table }) => {
    setIsUpdateData(true); // loading button

    try {
      const resp = await postBarbershop(values);
      console.log("resp", resp.data.success);
      if (resp.data.success) {
        console.log("Registro Exitoso");
        toast.success("Registro Exitoso");
        setIsLoadingData(true); // loading button
        await reloadData();
        table.setCreatingRow(null);
      } else {
        console.error("Error al crear Registro:", resp.data.error);
        toast.error("Error al crear Registro.");
        setIsLoadingData(false);
      }
    } catch (error) {
      console.error("Error al crear Registro:", error);
      toast.error("Error al crear Registro.");
      setIsLoadingData(false);
    } finally {
      setIsUpdateData(false);
    }
  };

  // UPDATE ACTION //
  const handleUpdate = async ({ values, row }) => {
    console.log("values", values);
    setIsUpdateData(true);
    const id = row.original._id;

    try {
      const resp = await updateBarbershop(values, id);
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
      console.error("Error al modificar:", error);
      toast.error("Error al modificar.");
      setIsUpdateData(false);
    }
  };

  // DELETE action
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

        try {
          const resp = await deleteBarbershop(id);
          if (resp.data.success) {
            toast.success("Se eliminó correctamente.");
            await reloadData();
          } else {
            toast.error("No se pudo eliminar.");
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
          toast.error("Error al eliminar.");
        }
      }
    });
  };

  //CLIC IN ROW
  const handleClickRow = (dataSelected) => {
    // console.log("dataSelected", dataSelected);
    setSelectedRow(dataSelected);
    setBarbershopSelected(dataSelected);
    console.log("dataSelected", dataSelected);
    toast.success(`La barbería "${dataSelected.nombre}" fue Selecionada`);
  };

  const table = useMaterialReactTable({
    columns,
    data: barbershops,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    localization: MRT_Localization_ES,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        handleClickRow(row.original);
      },
      sx: {
        backgroundColor: row.original === selectedRow ? "#009be5" : "inherit", // Aplica el color amarillo si la fila está seleccionada
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
    onCreatingRowSave: handleCreateUser,
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

const TabBarbershops = ({
  setBarbershopSelected,
  setReloadData,
  isLoading,
}) => (
  <QueryClientProvider client={queryClient}>
    <Table
      setBarbershopSelected={setBarbershopSelected}
      setReloadData={setReloadData}
      isLoading={isLoading}
    />
  </QueryClientProvider>
);

export default TabBarbershops;

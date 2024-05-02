import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Avatar, Box, Button, Stack } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { obtenerFechaDeHoy } from "../../../utils/date";
import PasswordTypography from "../../../components/atoms/PasswordTypography";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("imagen_barbero_asignado", {
    header: "IMAGEN",
    size: 50,
    Cell: ({ cell }) => (
      <Avatar sx={{ width: 50, height: 50, m: -1 }} src={cell.getValue()} />
    ),
  }),

  columnHelper.accessor("nombre_barbero_asignado", {
    header: "BARBERO",
    size: 50,
  }),
  columnHelper.accessor("nombre_servicio_asignado", {
    header: "SERVICIO",
    size: 50,
  }),

  columnHelper.accessor("costo", {
    header: "COSTO",
    size: 50,
  }),
  columnHelper.accessor("hora_inicio_asignada", {
    header: "HORA",
    size: 50,
  }),
  columnHelper.accessor("fecha_asignada", {
    header: "FECHA",
    size: 50,
  }),
  columnHelper.accessor("estatus", {
    header: "ESTATUS",
    size: 50,
  }),
];

const TablaReportes = ({ data, isLoading }) => {
  const handleExportData = (dataParam) => {
    console.log("dataParam", dataParam);
    const newData = dataParam.map((item) => ({
      BARBERO: item.nombre_barbero_asignado,
      SERVICIO: item.nombre_servicio_asignado,
      COSTO: item.costo,
      HORA: item.hora_inicio_asignada,
      FECHA: item.fecha_asignada,
      ESTATUS: item.estatus,
    }));
    generateFile(newData);
  };

  const handleExportDataSelection = (dataParam) => {
    console.log("dataParam", dataParam);
    const newData = dataParam.map((item) => ({
      BARBERO: item.original.nombre_barbero_asignado,
      SERVICIO: item.original.nombre_servicio_asignado,
      COSTO: item.original.costo,
      HORA: item.original.hora_inicio_asignada,
      FECHA: item.original.fecha_asignada,
      ESTATUS: item.original.estatus,
    }));
    generateFile(newData);
  };

  const handleExportVisibleColumns = (table) => {
    const columnToPropertyMap = {
      nombre_barbero_asignado: "BARBERO",
    };

    const visibleColumns = table.getVisibleLeafColumns();
    const dataMap = data.map((item) => {
      const visibleData = {};

      visibleColumns.forEach((column) => {
        const columnId = column.id;
        const propertyName = columnToPropertyMap[columnId] || columnId;

        if (item.hasOwnProperty(columnId)) {
          visibleData[propertyName] = item[columnId];
        }
      });

      return visibleData;
    });

    generateFile(dataMap);
  };

  const generateFile = (newData) => {
    const sheet = XLSX.utils.json_to_sheet(newData);

    // Crear un libro de Excel con la hoja
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Datos");

    // Generar un archivo xlsx a partir del libro
    const file = XLSX.write(book, { type: "array", bookType: "xlsx" });

    // Descargar el archivo xlsx
    const blob = new Blob([file], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.download = `Reporte_General_${obtenerFechaDeHoy()}.xlsx`;

    link.click();
  };

  const table = useMaterialReactTable({
    localization: MRT_Localization_ES, // Set the Spanish localization
    columns,
    data,
    // columnFilterDisplayMode: "popover",
    enableFullScreenToggle: false,
    enableRowSelection: true,

    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",

    rowStyle: {
      marginBottom: "0px", // Ajusta el valor según tus preferencias
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "15px",

          flexWrap: "wrap",
        }}
      >
        <Stack direction={"row"}>
          <Button
            onClick={() => handleExportData(data)}
            startIcon={<FileDownloadIcon />}
          >
            Todos
          </Button>
          <Button
            onClick={() => handleExportVisibleColumns(table)}
            startIcon={<FileDownloadIcon />}
          >
            Columnas visibles
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            onClick={() =>
              handleExportDataSelection(table.getSelectedRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Selección
          </Button>
        </Stack>
      </Box>
    ),
  });
  return (
    <MaterialReactTable
      table={table}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_ES}
    />
  );
};

export default TablaReportes;

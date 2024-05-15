import CardProduct from "../components/cards/CardProduct";
import HelpIcon from "@mui/icons-material/Help";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../api/gets";

const Tienda = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProducts(await getProducts());
    }
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Box sx={{ py: 3, backgroundColor: "#1f1f1f" }}>
      <Typography variant="h4" align="center" color={"#E2b753"}>
        Tienda
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mx: 1 }}>
        <Grid container>
          {currentProducts.map((producto) => (
            <Grid key={producto._id} item xs={6} sm={6} md={4} lg={3}>
              <Box sx={{ m: { xs: 0.5, sm: 2 } }}>
                <CardProduct producto={producto} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
          m: 2,
        }}
        spacing={2}
      >
        <Typography
          variant="h5"
          color={"white"}
          sx={{
            fontFamily: "Century Gothic",
            textAlign: "center",
            fontSize: { xs: 16, sm: 20 },
            py: 1,
          }}
        >
          Estos productos los puedes adquirir con tu barbero o en cualquiera de
          nuestras sucursales.
        </Typography>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)} // Calcula el número total de páginas
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{
            textAlign: "center",
            margin: "auto",
            "& .MuiPaginationItem-text": {
              color: "#fff", // Cambiar color paginación
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Tienda;

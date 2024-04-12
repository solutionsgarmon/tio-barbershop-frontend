import React from "react";
import TableProducts from "./TableProducts";
import { useAppContext } from "../../../context/AppProvider";
import TabImagenes from "./TabImagenes";
import { useState } from "react";

const Products = () => {
  const { indexTabSelected, setIndexTabSelected } = useAppContext();
  const [productSelected, setProductSelected] = useState(null);
  return (
    <div>
      {indexTabSelected == 0 && (
        <TableProducts setProductSelected={setProductSelected} />
      )}
      {indexTabSelected == 1 && (
        <TabImagenes productSelected={productSelected} />
      )}
    </div>
  );
};

export default Products;

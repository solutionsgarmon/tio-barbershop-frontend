import TransferList from "antd/es/transfer/list";
import React, { useEffect } from "react";
import MyTransferList from "../../../components/molecules/MyTransferList";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AlertWarning from "../../../components/messages/AlertWarning";

const TabBarbers = ({ barbershopSelected, barbers, assignedBarbers = [] }) => {
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    if (barbershopSelected) {
      console.log("barbershopSelected", barbershopSelected);
      console.log("barbershopSelected.barberos", barbershopSelected.barberos);
      console.log("barbers", barbers);
      setLeft(barbershopSelected.barberos);
      setRight(barbers);
    }
  }, [barbers, barbershopSelected]);

  return (
    <div>
      {barbershopSelected !== null ? (
        <MyTransferList
          left={left}
          right={right}
          setLeft={setLeft}
          setRight={setRight}
        />
      ) : (
        <AlertWarning
          text={
            "Debe seleccionar una Barbería para modificar los Barberos Asignados"
          }
        />
      )}
    </div>
  );
};

export default TabBarbers;

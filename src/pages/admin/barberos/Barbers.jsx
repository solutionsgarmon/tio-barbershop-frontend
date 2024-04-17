import { Box } from "@mui/material";
import React from "react";
import { useAppContext } from "../../../context/AppProvider";
import TabBarbers from "./TabBarbers";
import { useState } from "react";
import { getBarbers } from "../../../api/gets";
import { useEffect } from "react";

import TabImagenes from "./TabImagenes";
import TabHorario from "./TabHorario";
import ChangePassword from "../../../components/modals/ChangePassword";

const Barbers = () => {
  const { indexTabSelected, setIndexTabSelected } = useAppContext();
  const [barbers, setBarbers] = useState([]);
  const [barberSelected, setBarberSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setBarbers(await getBarbers());
      setIsLoading(false); // Mover aquí para que se establezca en false después de obtener los datos
    }

    fetchData();
    setBarberSelected(null);
    setIndexTabSelected(0);
  }, [reloadData]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      {indexTabSelected == 0 && (
        <TabBarbers
          barbers={barbers}
          assignedBarbers={barberSelected?.barberos}
          barberSelected={barberSelected}
          setBarberSelected={setBarberSelected}
          setReloadData={setReloadData}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}

      {indexTabSelected == 1 && (
        <TabHorario
          barberSelected={barberSelected}
          setReloadData={setReloadData}
        />
      )}
      {indexTabSelected == 2 && (
        <TabImagenes
          barberSelected={barberSelected}
          setReloadData={setReloadData}
        />
      )}

      <ChangePassword
        barberSelected={barberSelected}
        open={modalOpen}
        handleClose={handleCloseModal}
      />
    </Box>
  );
};

export default Barbers;

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
  const {
    indexTabSelected,
    setIndexTabSelected,
    sessionDataStorage,
    setIsLoadingApp,
  } = useAppContext();
  const [barbers, setBarbers] = useState([]);
  const [barberSelected, setBarberSelected] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingApp(true);
      let barberos = await getBarbers();
      if (sessionDataStorage.rol == "BARBERO") {
        const barberoEncontrado = barberos.find(
          (barbero) => sessionDataStorage._id === barbero._id
        );
        if (barberoEncontrado) {
          setBarbers([barberoEncontrado]);
        } else {
          setBarbers([]);
        }
      } else {
        setBarbers(barberos);
      }
      setIsLoadingApp(false);
    }

    fetchData();
    setBarberSelected(null);
  }, [reloadData]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      {indexTabSelected == 0 && (
        <TabBarbers
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
          setIndexTabSelected={setIndexTabSelected}
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

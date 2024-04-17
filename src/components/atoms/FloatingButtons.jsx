import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { styled } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
const StyledFab = styled(Fab)({
  backgroundColor: "#e2b753", // Color de fondo personalizado
  color: "black", // Color del icono
});
export default function FloatingAddButton({ handleClickFloatingButton }) {
  const handleClick = () => {
    handleClickFloatingButton();
  };

  return (
    <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <StyledFab aria-label="add" onClick={handleClick}>
        <EventIcon />
      </StyledFab>
    </Box>
  );
}

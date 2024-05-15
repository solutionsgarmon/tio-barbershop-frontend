import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Stack, Box, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ElementListWithImage({
  primaryText,
  secondaryText,
  image,
  setSucursalSelected,
  index,
  handleVerHorario,
}) {
  const handleClickItem = () => {
    setSucursalSelected(index);
  };
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        backgroundColor: "#FFF",
        borderRadius: 2,
        position: "relative", // Agregamos posición relativa para que el botón se pueda posicionar absolutamente dentro de este componente
        "&:hover": {
          border: "1px solid #E2b753 ",
          backgroundColor: "#E2b753 ",
          cursor: "pointer",
        },
      }}
      onClick={handleClickItem}
    >
      <ListItemAvatar>
        <Avatar
          alt={primaryText}
          src={image}
          sx={{ width: 50, height: 50, mr: 2 }}
        />
      </ListItemAvatar>
      <Stack direction={"column"}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                {primaryText}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {secondaryText}
              </Typography>
            </React.Fragment>
          }
        />
        <Box
          sx={{
            position: "absolute", // Posicionamos absolutamente el botón dentro de este componente
            top: 18,
            right: 25,
            transform: "translate(50%, -50%)", // Ajustamos el botón a la esquina superior derecha
          }}
        >
          <Tooltip title="Ver horarios de esta barbershop">
            <Button
              size="small"
              variant="text"
              onClick={() => handleVerHorario()}
              sx={{
                fontFamily: "Century Gothic",
              }}
            >
              <AccessTimeIcon
                sx={{
                  color: "#1f1f1f",
                }}
              />
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </ListItem>
  );
}

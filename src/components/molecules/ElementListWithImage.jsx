import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";

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
        border: "1px solid transparent",
        borderRadius: "10px",
        "&:hover": {
          border: "1px solid #ff9800",
          backgroundColor: "#FAFEBB",
          cursor: "pointer",
        },
      }}
      onClick={handleClickItem}
    >
      <ListItemAvatar>
        <Avatar alt={primaryText} src={image} />
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

        <Button
          sx={{ alignSelf: "flex-start" }}
          onClick={() => handleVerHorario()}
        >
          Ver Horario
        </Button>
      </Stack>
    </ListItem>
  );
}

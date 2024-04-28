import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

const TableHorario = ({ horario }) => {
  return (
    <div>
      {/* <Typography variant="h6" gutterBottom>
        Horario de la semana
      </Typography> */}
      <List>
        {Object.entries(horario).map(([dia, detalles]) => (
          <div key={dia}>
            <ListItem>
              <ListItemIcon sx={{ ml: -2, mr: -2 }}>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary={dia}
                secondary={`${
                  detalles.trabaja === "S" ? "Abierto" : "Cerrado"
                } | ${detalles.hora_inicio} - ${detalles.hora_fin}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TableHorario;

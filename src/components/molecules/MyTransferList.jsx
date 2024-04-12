import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function MyTransferList({
  left,
  right,
  setRight,
  setLeft,
  titleLeft,
  titleRight,
  handleSave,
}) {
  const [checked, setChecked] = React.useState([]);
  const [enableSave, setEnableSave] = React.useState(false);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setEnableSave(true);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setEnableSave(true);
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={<></>}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 300,
          height: 400,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value.nombre}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(<strong>{titleLeft} </strong>, left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <IconButton
            sx={{ my: 0.5 }}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            <ArrowForwardIcon />
          </IconButton>

          <IconButton
            sx={{ my: 1 }}
            onClick={handleSave}
            disabled={!enableSave}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            sx={{ my: 1 }}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <strong sx={{ fontWeight: "bold" }}>
          {customList(<strong>{titleRight}</strong>, right)}
        </strong>
      </Grid>
    </Grid>
  );
}

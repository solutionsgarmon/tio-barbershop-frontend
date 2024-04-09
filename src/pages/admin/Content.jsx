import Paper from "@mui/material/Paper";
import { useAppContext } from "../../context/AppProvider";

export default function Content(props) {
  const { windowWidth } = useAppContext();

  return (
    <Paper
      sx={{
        overflow: "hidden",
        margin: "auto",
      }}
    >
      {props.displayComponent}
    </Paper>
  );
}

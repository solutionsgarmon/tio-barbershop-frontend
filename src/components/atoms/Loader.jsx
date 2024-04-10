import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ showBackdrop }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showBackdrop}
    >
      <CircularProgress color="inherit" size={80} />
    </Backdrop>
  );
}

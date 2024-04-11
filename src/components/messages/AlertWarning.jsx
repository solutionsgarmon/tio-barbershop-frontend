import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const AlertWarning = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <WarningAmberIcon sx={{ fontSize: 80, color: "warning.main", mb: 2 }} />
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ width: 300, height: 300 }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default AlertWarning;

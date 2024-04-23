import React, { useState } from "react";
import { Typography, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordTypography = ({ value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    console.log("value", value);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Typography>
      {showPassword ? value : "*".repeat(10)}
      <IconButton onClick={handleTogglePasswordVisibility}>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Typography>
  );
};

export default PasswordTypography;

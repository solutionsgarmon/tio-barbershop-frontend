import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function HorizontalLinearAlternativeLabelStepper({
  steps,
  currenStep,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currenStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ fontFamily: "Century Gothic" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

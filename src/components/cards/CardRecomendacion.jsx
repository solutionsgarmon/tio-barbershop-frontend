import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
  Stack,
} from "@mui/material";

const CardRecomendacion = () => {
  return (
    <Card sx={{ m: "auto" }}>
      <CardContent>
        <Stack direction={"column"} alignItems="center" mb={2}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Avatar del cliente"
              src="/images/avatar1.png"
              sx={{ width: 150, height: 150, borderRadius: "50%", p: 0.5 }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "6px solid gold",
                borderRadius: "50%",
                boxSizing: "border-box",
              }}
            />
          </div>
          <Typography variant="h5" component="div" sx={{ mt: 2 }}>
            Carlos Zambrano López
          </Typography>
        </Stack>
        <Rating name="read-only" value={5} readOnly />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "justify", mt: 2, mx: { xs: 1, sm: 4 } }}
        >
          ¡Increíble experiencia en esta barbería! Desde que entré por la
          puerta, me recibieron con una sonrisa cálida y un ambiente acogedor.
          El personal estaba muy atento y profesional, y rápidamente entendieron
          exactamente lo que quería para mi corte de pelo. El barbero que me
          atendió mostró un gran nivel de habilidad y atención al detalle,
          logrando exactamente el estilo que estaba buscando.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardRecomendacion;

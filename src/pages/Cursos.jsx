import React from "react";
import PostFullscreen from "../components/cards/PostFullscreen";
import { Box, Stack } from "@mui/material";

const Cursos = () => {
  return (
    <Stack
      direction="column"
      sx={{
        textAlign: "center",
        m: "auto",
        mt: 3,
        maxWidth: { xs: 350, sm: 600 },
      }}
    >
      <PostFullscreen
        title={"Curso de cómo realizar un Fade"}
        subtitle={"20 de mayo de 2024"}
        image={""}
        description={
          "En este curso aprenderás a realizar un Fade perfecto. Ven y adquiere conocimientos de los mejores. No te arrepentirás. Este curso es perfecto para todas las personas, sin importar su edad."
        }
      />
      <PostFullscreen
        title={"Curso de cómo realizar un Fade"}
        subtitle={"20 de mayo de 2024"}
        image={""}
        description={
          "En este curso aprenderás a realizar un Fade perfecto. Ven y adquiere conocimientos de los mejores. No te arrepentirás. Este curso es perfecto para todas las personas, sin importar su edad."
        }
      />
      <PostFullscreen
        title={"Curso de cómo realizar un Fade"}
        subtitle={"20 de mayo de 2024"}
        image={""}
        description={
          "En este curso aprenderás a realizar un Fade perfecto. Ven y adquiere conocimientos de los mejores. No te arrepentirás. Este curso es perfecto para todas las personas, sin importar su edad."
        }
      />
      <PostFullscreen
        title={"Curso de cómo realizar un Fade"}
        subtitle={"20 de mayo de 2024"}
        image={""}
        description={
          "En este curso aprenderás a realizar un Fade perfecto. Ven y adquiere conocimientos de los mejores. No te arrepentirás. Este curso es perfecto para todas las personas, sin importar su edad."
        }
      />
    </Stack>
  );
};

export default Cursos;

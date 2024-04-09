import React from "react";

class ComponentWithError extends React.Component {
  render() {
    // Simulamos un error lanzando una excepción
    throw new Error("Simulated error");
  }
}

export default ComponentWithError;

import Swal from "sweetalert2";

export const solicitarNuevoPassword = async () => {
  const { value: contraseñaIngresada } = await Swal.fire({
    title: 'Ingrese su contraseña',
    input: 'password',
    inputLabel: 'Contraseña',
    inputPlaceholder: 'Ingrese su contraseña',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });

  // Verificar si la contraseña ingresada es correcta
  if (contraseñaIngresada === null) {
    // El usuario cerró el cuadro de diálogo sin ingresar una contraseña
    Swal.fire('Operación cancelada', '', 'info');
    return null; // Retorna null si no se ingresó ninguna contraseña
  } else {
    // Retorna la contraseña ingresada para que pueda ser utilizada en otro lugar del código
    return contraseñaIngresada;
  }
};

// Llamar a la función para solicitar la contraseña y utilizar la contraseña ingresada
solicitarNuevoPassword().then(contraseña => {
  if (contraseña !== null) {
    // La contraseña ingresada no es nula, por lo que podemos hacer algo con ella
    console.log('La contraseña ingresada es:', contraseña);
    // Aquí puedes hacer lo que necesites con la contraseña, por ejemplo, enviarla a un servidor
  } else {
    // El usuario canceló la operación
    console.log('Operación cancelada');
  }
});

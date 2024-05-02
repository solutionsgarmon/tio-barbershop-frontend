export function obtenerFechaDeHoy() {
const fechaHoy = new Date();
  const nombresMeses = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];
  const anio = fechaHoy.getFullYear();


  // Obtener el nombre del mes correspondiente al índice
  const mesIndex = fechaHoy.getMonth();
  const nombreMes = nombresMeses[mesIndex];
  const dia = String(fechaHoy.getDate()).padStart(2, '0');

  const fechaFormateada = `${anio}-${nombreMes}-${dia}`;
  return fechaFormateada;
}

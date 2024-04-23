export function sumarMinutosAHora(horaString, minutosAgregar) {
  // Convertir minutosAgregar a número entero si es una cadena
  minutosAgregar = parseInt(minutosAgregar, 10);

  // Dividir la hora y los minutos
  const [hora, minutos] = horaString.split(':').map(Number);

  // Calcular la nueva hora y minutos
  let nuevaHora = hora + Math.floor((minutos + minutosAgregar) / 60);
  let nuevosMinutos = (minutos + minutosAgregar) % 60;

  // Ajustar la nueva hora si excede 24 horas
  nuevaHora = nuevaHora % 24;

  // Formatear la nueva hora
  const nuevaHoraString = `${nuevaHora < 10 ? '0' : ''}${nuevaHora}:${nuevosMinutos < 10 ? '0' : ''}${nuevosMinutos}`;

  return nuevaHoraString;
  // Ejemplo de uso con argumento de minutos como número entero
console.log(sumarMinutosAHora("6:40", 50)); // Output: "07:30"
console.log(sumarMinutosAHora("6:40", "50")); // Output: "07:30"
}



  // Ejemplo de uso:
  // const url = "https://ejemplo.com/api/datos";
  // const metodo = "GET";
  // const datos = null; // Puedes proporcionar datos si es necesario
  // const headers = {
  //   Authorization: "Bearer tu-token-de-autenticación",
  //   "Otro-Encabezado": "Valor",
  // };

import axios from "axios";

export function getProducts() {
  return new Promise((resolve, reject) => {
    axios.get(import.meta.env.VITE_PRODUCTS_URL)
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getProducts():", data.error);
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getProducts():");
          resolve([]); 
        } else if (data) {
          console.log("PRODUCTOS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getProducts():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_USERS_URL)
    .then((response) => {
        const data = response.data;
        console.log("getUsers()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getUsers():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getUsers():");
          resolve([]); 
        } else  {
          console.log("getUsers -> USUARIOS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getUsers():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}


// Función para verificar si un usuario existe y obtener su rol
export const getExisteUser = async (correo) => {
  try {
    // Realizar la solicitud a la API
   const response=  await axios.get(`${import.meta.env.VITE_USERS_URL}/existe-usuario?correo=${correo}`);
console.log("response",response)
    // Verificar la respuesta de la API
    const data = response.data.data; // Obtener los datos de la respuesta
    
    if (data.encontrado) {
      // Si se encuentra el usuario, mostrar el rol
    
      console.log(`Usuario encontrado. Rol: ${data.rol}`);  
      return true
    } else {
      // Si no se encuentra el usuario, mostrar un mensaje de usuario no encontrado
      console.log('Usuario no encontrado.');
      return false
    }
  } catch (error) {
    // Manejar errores de la solicitud
    console.error('Error al verificar el usuario:', error);
    
  }
};

export function getBarbers() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_BARBERS_URL)
    .then((response) => {
        const data = response.data;
        console.log("getUsers()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getBarbers():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getBarbers():");
          resolve([]); 
        } else  {
          console.log("getUsers -> BARBERS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getBarbers():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getHorarioDisponibleBarber(idBarbero,idServicio) {
  const body = {
    idBarbero: idBarbero,
    idServicio: idServicio
  }
  return new Promise((resolve, reject) => {
      axios.post(`${import.meta.env.VITE_BARBER_URL}/horario-disponible`,body)
    .then((response) => {
        const data = response.data;
        console.log("getHorarioDisponibleBarber()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getHorarioDisponibleBarber():", data);
          reject(data); 
       
        } else  {
          console.log("getHorarioDisponibleBarber -> ", data.horarioDisponible);
          resolve(JSON.parse(JSON.stringify(data.horarioDisponible))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getHorarioDisponibleBarber():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

// export function getBarber(id) {
//   return new Promise((resolve, reject) => {
//       axios.get(`${import.meta.env.VITE_BARBER_URL}/${id}`)
//     .then((response) => {
//         const data = response.data;
//         console.log("getUsers()", data);
//         if (!data.success) {
//           console.error("No se pudo realizar correctamente la petición getBarbers():", data);
//           reject(data); 
//         } else if (data.length === 0) {
//           console.info("🛈 No se encontraron elementos para getBarbers():");
//           resolve([]); 
//         } else  {
//           console.log("getBarber -> BARBES", data.data);
//           resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
//         }
//       })
//       .catch((error) => {
//         console.error("Error en getBarbers():", error);
//         reject(error); // Rechaza la promesa en caso de error
//       });
//   });
// }

export function getAdmins() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_ADMINS_URL)
    .then((response) => {
        const data = response.data;
        console.log("getAdmins()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getAdmins():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getAdmins():");
          resolve([]); 
        } else  {
          console.log("getAdmins -> ADMINISTRADORES", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getAdmins():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}



export function getBarbershops() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_BARBERSHOPS_URL)
    .then((response) => {
        const data = response.data;
        console.log("getBarbershops()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getBarbershops():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getBarbershops():");
          resolve([]); 
        } else  {
          console.log("getBarbershops -> BARBERSHOPS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getBarbershops():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitas() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_CITAS_URL)
    .then((response) => {
        const data = response.data;
        console.log("getCitas()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitas():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitas():");
          resolve([]); 
        } else  {
          console.log("getCitas -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitas():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasRegistro() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_CITAS_REGISTRO_URL)
    .then((response) => {
        const data = response.data;
        console.log("getCitasRegistro()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasRegistro():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasRegistro():");
          resolve([]); 
        } else  {
          console.log("getCitasRegistro -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasRegistro():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasByCorreo(correo) {
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_URL}/getByIdCorreo/${correo}`)
    .then((response) => {
        const data = response.data;
        console.log("getCitasByCorreo()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasByCorreo():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasByCorreo():");
          resolve([]); 
        } else  {
          console.log("getCitasByCorreo -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasByCorreo():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasRegistroByCorreo(correo) {
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_REGISTRO_URL}/getByIdCorreo/${correo}`)
    .then((response) => {
        const data = response.data;
        console.log("getCitasByCorreo()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasByCorreo():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasByCorreo():");
          resolve([]); 
        } else  {
          console.log("getCitasByCorreo -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasByCorreo():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}




export function getCitasByIdBarbero(id) {
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_URL}/getByIdBarbero/${id}`)
    .then((response) => {
        const data = response.data;
        console.log("getCitasByCorreoBarbero()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasByCorreoBarbero():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasByCorreoBarbero():");
          resolve([]); 
        } else  {
          console.log("getCitasByCorreoBarbero -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasByCorreoBarbero():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasPendientesByIdBarbero(id) {
  console.log("[ejecución] getCitasPendientesByIdBarbero",id)
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_URL}/getPendientesByIdBarbero/${id}`)
    .then((response) => {  
       console.log("getCitasPendientesByIdBarbero() response", response);
        const data = response.data;
     
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasPendientesByIdBarbero():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasPendientesByIdBarbero():");
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        } else  {
          console.log("getCitasPendientesByIdBarbero -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasByCorreoBarbero():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasCompletadasByIdBarbero(id) {
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_REGISTRO_URL}/getCompletadasByIdBarbero/${id}`)
    .then((response) => {
        const data = response.data;
        console.log("getCitasCompletadasByIdBarbero()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasCompletadasByIdBarbero():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasCompletadasByIdBarbero():");
          resolve([]); 
        } else  {
          console.log("getCitasCompletadasByIdBarbero -> CITAS COMPLETADAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasCompletadasByIdBarbero():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getCitasCanceladasByIdBarbero(id) {
  return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_CITAS_REGISTRO_URL}/getCanceladasByIdBarbero/${id}`)
    .then((response) => {
        const data = response.data;
        console.log("getCitasCanceladasByIdBarbero()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getCitasCanceladasByIdBarbero():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getCitasCanceladasByIdBarbero():");
          resolve([]); 
        } else  {
          console.log("getCitasCanceladasByIdBarbero -> CITAS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getCitasCanceladasByIdBarbero():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getServices() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_SERVICES_URL)
    .then((response) => {
        const data = response.data;
        console.log("getServices()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getServices():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getServices():");
          resolve([]); 
        } else  {
          console.log("getServices -> SERVICES", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getServices():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

export function getPosts() {
  return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_POST_URL)
    .then((response) => {
        const data = response.data;
        console.log("getPosts()", data);
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición getPosts():", data);
          reject(data); 
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getPosts():");
          resolve([]); 
        } else  {
          console.log("getPosts -> SERVICES", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getPosts():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}




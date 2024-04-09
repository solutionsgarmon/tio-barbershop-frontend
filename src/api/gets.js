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
          console.log("getBarbershops -> BARBERS", data.data);
          resolve(JSON.parse(JSON.stringify(data.data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getBarbershops():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}


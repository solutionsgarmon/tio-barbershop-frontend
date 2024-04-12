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




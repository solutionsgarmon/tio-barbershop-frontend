import axios from 'axios';

export function postUser(data) {
  console.log("[ejecución] postUser()", data)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_USERS_URL, data)
      .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postUser():", error);
        reject(error); 
      });
  });
}

export function postBarbershop(data) {
  console.log("[ejecución] postBarbershop()", data)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_BARBERSHOPS_URL, data)
      .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postBarbershop():", error);
        reject(error); 
      });
  });
}

export function postServices(data) {
  console.log("[ejecución] postServices()", data)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_SERVICES_URL, data)
      .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postServices():", error);
        reject(error); 
      });
  });
}

export function postProduct(product) {
  console.log("[ejecución] postProduct()",product)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_PRODUCTS_URL, product)
   .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postProduct():", error);
        reject(error); 
      });
      
  });
}

export function postPost(data) {
  console.log("[ejecución] postPost()", data)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_POST_URL, data)
      .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postPost():", error);
        reject(error); 
      });
  });
}

export function postCita(data) {
  console.log("[ejecución] postCita()", data)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_CITAS_URL, data)
      .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postCita():", error);
        reject(error); 
      });
  });
}






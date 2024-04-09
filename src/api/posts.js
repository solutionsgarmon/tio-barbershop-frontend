import axios from 'axios';

export function postPersons(dataToPost) {
   console.log("[ejecución] postPersons()",dataToPost)
  return new Promise((resolve, reject) => {
   
    axios.post(import.meta.env.VITE_PERSONS_URL, dataToPost)
      .then((response) => {
        const data = response.data;

        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición postPersons():", data);
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        } else if (data.success) {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en postPersons():", error);
        reject(error); 
      });
     
  }); 
}

export function postUser(user) {
  console.log("[ejecución] postUser()", user)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_USERS_URL, user)
      .then((response) => {
        resolve(response); // Resolver con true cuando la solicitud sea exitosa
      })
      .catch((error) => {
        console.error("Error en postUser():", error);
        reject(error); // Rechazar con el error cuando ocurra un error
      });
  });
}

export function postProduct(product) {
  console.log("[ejecución] postProduct()",product)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_CAT_PROD_SERV_URL, product)
      .then((response) => {
        console.log("[response] postProduct()",product)
        const data = response.data;

        if (!data.success) {  
          console.error("No se pudo realizar correctamente la petición postProduct():", data);
          reject(data); 
        } else if (data.success) {
           resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en postProduct():", error);
        reject(error); 
      });
      
  });
}


export function postOrden(dataPostOrden) {
  console.log("[ejecución] postOrden()",dataPostOrden)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_ORDENES_URL, dataPostOrden)
      .then((response) => {
        console.log("[response] postOrden()",response)
        const data = response.data;

        if (!data.success) {  
          console.error("No se pudo realizar correctamente la petición postOrden():", data);
          reject(data); 
        } else if (data.success) {
           resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en postOrden():", error);
        reject(error); 
      });
      
  });
}




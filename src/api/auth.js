import axios from "axios";


export function autenticarUsuario(values) {
  console.log("[ejecución] autenticarUsuario()", values)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_LOGIN_URL, values)
      .then((response) => {
      
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en autenticarUsuario():", error);
        reject(error); 
      });
  });
}
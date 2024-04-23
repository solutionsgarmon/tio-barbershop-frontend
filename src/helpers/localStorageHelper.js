// import jwt from 'jsonwebtoken';
import { sessionModel } from '../models/session';
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Reemplaza con tu clave secreta

//Guardar Elementos en LocalStorage
export const addToLocalStorage =(key, value) =>{
  try {
    // Convierte el valor a JSON antes de almacenarlo para asegurar que sea una cadena
    const element = JSON.stringify(value);
    localStorage.setItem(key, element);
  } catch (error) {
    console.error('Error al agregar elemento al Local Storage:', error);
  }
}

//Recuperar Elemetos del LocalStorage
export const getFromLocalStorage = (key)=> {
  try {
    const element = localStorage.getItem(key);
    if (element === null) {
      return null;
    }
      // Convierte el valor a JSON antes de almacenarlo para asegurar que sea una cadena
    return JSON.parse(element);
  } catch (error) {
    console.error('Error al recuperar elemento del Local Storage:', error);
    return null;
  }
}

// Función para cifrar y almacenar datos en el Local Storage
// export function addToLocalStorageEncrypt(key, data) {
//   try {
//     const encryptedData = jwt.sign(data, SECRET_KEY);
//     localStorage.setItem(key, encryptedData);
//   } catch (error) {
//     console.error('Error al cifrar y almacenar datos:', error);
//   }
// }

// // Función para recuperar y descifrar datos del Local Storage
// export function getFromLocalStorageDecrypt(key) {
//   try {
//     const encryptedData = localStorage.getItem(key);
//     if (encryptedData) {
//       const decryptedData = jwt.verify(encryptedData, SECRET_KEY);
//       return decryptedData;
//     }
//     return null; // Si no hay datos en el Local Storage
//   } catch (error) {
//     console.error('Error al descifrar datos:', error);
//     return null;
//   }
// }

// Función para eliminar datos del Local Storage
export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export async function createUserSession(userFB){
   console.log("createUserSession")
  let dataSessionGoogle = sessionModel()
  dataSessionGoogle.username =userFB.displayName
  dataSessionGoogle.email =userFB.email;
  dataSessionGoogle.urlImage=userFB.photoURL
  dataSessionGoogle.isAuthenticated =true
  dataSessionGoogle.emailVerified = userFB.emailVerified

  console.log("dataSessionGoogle",dataSessionGoogle)
  addToLocalStorage("sessionGoogle",dataSessionGoogle)
  return dataSessionGoogle
}

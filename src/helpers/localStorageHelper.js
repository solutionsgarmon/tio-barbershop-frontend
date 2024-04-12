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
  let session = sessionModel()
  session.username =userFB.displayName
  session.email =userFB.email;
  session.urlImage=userFB.photoURL
  session.isAuthenticated =true
  session.emailVerified = userFB.emailVerified

  console.log("session",session)
  addToLocalStorage("session",session)
  return true
}

//Si existe el valor lo retorna, si no, lo crea y retorna
  export const verifyPositionStaticBar = () => {
    const value = getFromLocalStorage("IS_STATIC_TOOLBAR");
    if (value === null || value === undefined) {
      addToLocalStorage("IS_STATIC_TOOLBAR",true);
      console.log("IS_STATIC_TOOLBAR no existía en el localStorage, se creó");
      return false
    } else {
      return value
    }
  };
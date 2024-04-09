import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth, signInWithPopup, GoogleAuthProvider,signOut    } from "firebase/auth";
import { auth } from "../../credencialesFireStore";
import { removeFromLocalStorage } from "../helpers/localStorageHelper";


// Función para registrar un nuevo usuario
export async function registrarUsuarioFB(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential; 
  } catch (error) {
    throw new Error( error.code);
  }
}
export async function autenticarUsuarioFB(email, password) {
 try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
   
    return user; 
  } catch (error) {
    throw new Error( error.code);
  }
}

export async function autenticarUsuarioConGoogle() {
    const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
     return user
     
    } catch (error) {
      const errorCode = error.code;
      console.error(errorCode);
    }

}

export async function cerrarSesionUsuario() {
  try {
    await signOut(auth);
    console.log("Usuario cerró sesión exitosamente");
    removeFromLocalStorage("session")
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error(error.code);
  }
}
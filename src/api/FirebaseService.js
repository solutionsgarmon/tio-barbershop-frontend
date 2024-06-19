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
 const googleClientId ='358256203753-1bj65m8mamc2on567ehfk3s0u1iumivm.apps.googleusercontent.com'
    const provider = new GoogleAuthProvider();
     provider.setCustomParameters({
      'client_id': googleClientId
    });
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
    		window.location.reload();
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error(error.code);
  }
}
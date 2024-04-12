export function sessionModel() {
let model = {
  username: "",
  name:"",
  rol:"usuario",
  email: "",
  urlImage:"",
  isLoggedIn: false, // Indicador de si el usuario está conectado o no
  isAuthenticated: false, 
  sessionExpiration:null,
  emailVerified:false,
}

return  model 

}
import axios from "axios";

export function updateUser( values,idUser) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_USERS_URL}/${idUser}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateProduct():", data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateUser():", error);
        reject(error);
      });
  });
}

export function updateProduct(values, idProduct) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_PRODUCTS_URL}/${idProduct}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateProduct():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateProduct():", error);
        reject(error);
      });
  });
}
//No me manda response
export function updateBarber(values, idBarber) {
  console.log("> updateBarber() - > Values",values)
    console.log("> updateBarber() - > idBarber",idBarber)
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_BARBERS_URL}/update/${idBarber}`,
      values
    )
      .then((response) => {
        console.log("response updateBarber"),response
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateBarber():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateBarber():", error);
        reject(error);
      });
  });
}

export function updatePassworsBarber(values, idBarber) {
  console.log("> updatePassworsBarber()")
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_BARBERS_URL}/update-password/${idBarber}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updatePassworsBarber():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateBarber():", error);
        reject(error);
      });
  });
}


export function updateAppSettings(values, id) {
  console.log("> updatePassworsBarber()")
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_APP_SETTINGS_URL}/${id}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateAppSettings():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateAppSettings():", error);
        reject(error);
      });
  });
}

export function updateAdmin(values, idAdmin) {
 
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_ADMINS_URL}/${idAdmin}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateAdmin():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateAdmin():", error);
        reject(error);
      });
  });
}

export function updateBarbershop(values, idBarbershop) {
   console.log("updateBarbershop()=>",values,idBarbershop)
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_BARBERSHOPS_URL}/${idBarbershop}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateBarbershop():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateBarbershop():", error);
        reject(error);
      });
  });
}

export function updateCita(values, idCita) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_CITAS_URL}/${idCita}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateCita():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateCita():", error);
        reject(error);
      });
  });
}

export function updateCitaRegistro(values, idCita) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_CITAS_REGISTRO_URL}/${idCita}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateCitaRegistro():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateCitaRegistro():", error);
        reject(error);
      });
  });
}



export function updateService(values, idService) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_SERVICES_URL}/${idService}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateService():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateService():", error);
        reject(error);
      });
  });
}

export function updatePost(values, idPost) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_POST_URL}/${idPost}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updatePost():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updatePost():", error);
        reject(error);
      });
  });
}

export function updateCurso(values, id) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_CURSOS_URL}/${id}`,
      values
    )
      .then((response) => {
        if (!response.data.success) {
          console.error("No se pudo realizar correctamente la petición updateCurso():", response.data);
          reject(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateCurso():", error);
        reject(error);
      });
  });
}


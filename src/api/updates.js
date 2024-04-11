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

export function updateBarber(values, idBarber) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${import.meta.env.VITE_BARBERS_URL}/${idBarber}`,
      values
    )
      .then((response) => {
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

export function updateBarbershop(values, idBarbershop) {
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


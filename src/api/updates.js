import axios from "axios";

export function updateProduct(product, dataToUpdate) {
  console.log("[ejecución] dataToUpdate()", dataToUpdate);
  console.log("[ejecución] product()", product);

  return new Promise((resolve, reject) => {
    axios.patch(
      import.meta.env.VITE_CAT_PROD_SERV_URL,
      dataToUpdate,
      {
        params: {
          IdInstitutoOK: product.IdInstitutoOK,
          IdProdServOK: product.IdProdServOK
        }
      }
    )
      .then((response) => {
        console.log("[response] updateProduct()", dataToUpdate);
        const data = response.data;

        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición updateProduct():", data);
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en updateProduct():", error);
        reject(error);
      });
  });
}


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

import axios from 'axios';


export function deleteProduct(producto) {
  console.log("[ejecución] deleteProduct()", producto);

  return new Promise((resolve, reject) => {
    axios.delete(import.meta.env.VITE_CAT_PROD_SERV_URL , {
      params: {
        IdInstitutoOK: producto.IdInstitutoOK,
        IdProdServOK: producto.IdProdServOK,
        
      }
    })
      .then((response) => {
        const data = response.data;

        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición deleteProduct():", data);
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en deleteProduct():", error);
        reject(error);
      });
  });
}


export const deleteUser = async (idUser) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_USERS_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: idUser 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteUser()",error)
       return false
    }

};





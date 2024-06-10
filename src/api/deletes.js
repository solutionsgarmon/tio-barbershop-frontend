import axios from 'axios';

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_USERS_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteUser()",error)
       return false
    }
};

export const deleteBarber = async (id) => {
    try {
         const response = await axios.delete(`${import.meta.env.VITE_BARBERS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteBarber()",error)
       return false
    }
};

export const deleteAdmin = async (id) => {
    try {
         const response = await axios.delete(`${import.meta.env.VITE_ADMINS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteAdmin()",error)
       return false
    }
};

export const deleteProduct= async (id) => {
    try {
         const response = await axios.delete(`${import.meta.env.VITE_PRODUCTS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteProduct()",error)
       return false
    }
};

export const deleteBarbershop = async (id) => {
    console.log("id",id)
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BARBERSHOPS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteBarbershop()",error)
       return false
    }
};

export const deleteCita = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_CITAS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteCita()",error)
       return false
    }
};

export const deleteCurso = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_CURSOS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteCita()",error)
       return false
    }
};
export const deleteCitaRegistro = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_CITAS_REGISTRO_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteCita()",error)
       return false
    }
};

export const deleteService = async (id) => {
    try {
         const response = await axios.delete(`${import.meta.env.VITE_SERVICES_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deleteService()",error)
       return false
    }
};

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_POSTS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id 
            }
        });
    return response
 
    } catch (error) {
      console.log("Error en deletePost()",error)
       return false
    }
};





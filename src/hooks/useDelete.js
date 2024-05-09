import axios from "axios";

export const useDelete = async ( endpoint ) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // configurar el encabezado de autorización con el token
    const headers = {
        Authorization: `Bearer ${user.token}`,
    };

    return await axios.delete(import.meta.env.VITE_BASE_URL + endpoint, { headers });
};

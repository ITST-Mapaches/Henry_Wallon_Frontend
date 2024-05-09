import axios from "axios";

export const usePost = async ( endpoint, form ) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // configurar el encabezado de autorización con el token
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  return await axios.post(import.meta.env.VITE_BASE_URL + endpoint, form, { headers });
};

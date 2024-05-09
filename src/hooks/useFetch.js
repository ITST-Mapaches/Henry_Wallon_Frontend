import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (endpoint) => {
  //estado inicial
  const [state, setState] = useState({
    data: [],
    isLoading: true,
  });

  // se ejecuta el fetching
  useEffect(() => {
    getFetch();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

    // configurar el encabezado de autorización con el token
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };

  //funcion asíncrona que hace la petición HTTP
  const getFetch = async () => {
    try {
      // peticion
      const response = await axios.get(import.meta.env.VITE_BASE_URL + endpoint, {headers});

      //obteniendo la info de json a objeto normal js
      const { data } = response.data;

      // actualizando estado
      setState({
        data: data,
        isLoading: false,
      });
    } catch (error) {
      // actualizando el state con los valores correspondientes
      setState({
        data: [],
        isLoading: false,
      });
    }
  };

  return {
    ...state,
    getFetch,
  };
};

import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (endpoint) => {
  //estado inicial
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  // se ejecuta el fetching
  useEffect(() => {
    getFetch();
  }, []);

  //funcion asíncrona que hace la petición HTTP
  const getFetch = async () => {
    try {
      // peticion
      const response = await axios.get(import.meta.env.VITE_BASE_URL + endpoint);

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
        data: null,
        isLoading: false,
      });
    }
  };

  return {
    ...state,
    getFetch,
  };
};

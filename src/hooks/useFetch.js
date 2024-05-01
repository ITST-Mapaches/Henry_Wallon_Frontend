import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (endpoint) => {
  //estado
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  const [send, setSend] = useState(false);

  //! se ejecuta el fetching unicamente cuando cambia el url
  //por primera vez
  useEffect(() => {
    getFetch();
  }, [send]);

  //!funcion que establece el loading en true
  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
    });
  };

  //!funcion asíncrona que hace la petición HTTP
  const getFetch = async () => {
    //llama a la funcion que pone el loading en true
    setLoadingState();

    // peticion
    const response = await axios.get(import.meta.env.VITE_BASE_URL + endpoint);

    //| si la respuesta fue erronea
    if (response.status != 200) {
      // actualizamos el state con los valores correspondientes
      setState({
        data: null,
        isLoading: false,
      });

      return;
    }

    // | en caso contrario
    //obtenemos la info de json a objeto normal js
    const { data } = response.data;

    // console.log(data);

    setState({
      data: data,
      isLoading: false,
    });
  };

  // funcion para recargar data.
  const reFetch = () => {
    setSend(!send);
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    reFetch,
  };
};

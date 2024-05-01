import { useState, useEffect } from "react";
import axios from "axios";

export const useUsers = () => {
  // estado inicial de 
  const [state, setState] = useState({
    users: null,
    isLoading: true,
  });

  // funcion para cargar usuarios
  const loadUsers = async () => {
    try {
      const resultado = await axios.get(
        import.meta.env.VITE_BASE_URL + "getUsuarios"
      );

      const { data } = resultado.data;

      setState({
        users: data,
        isLoading: false,
      });
    } catch (error) {
      // actualizamos el state con los valores correspondientes
      setState({
        users: null,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    ...state,
    loadUsers,
  };
};

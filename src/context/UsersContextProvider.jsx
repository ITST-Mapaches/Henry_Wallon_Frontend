import { createContext } from "react";
import {useFetch} from '../hooks/';

//creacion de un nuevo contexto
const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
  return (
    <UsersContext.Provider value={useFetch("getUsuarios")}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersContextProvider };

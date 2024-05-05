import {createContext} from "react";
import { useFetch } from "../hooks";

//creacion de un nuevo contexto
const AsignaturasContext = createContext();

const AsignaturasContextProvider = ({ children }) => {
  return (
    <AsignaturasContext.Provider value={useFetch('asignaturas')}>
      {children}
    </AsignaturasContext.Provider>
  );
};

export { AsignaturasContext , AsignaturasContextProvider};

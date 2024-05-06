import { createContext } from "react";
import { useFetch } from "../hooks";

//creacion de un nuevo contexto
const GruposContext = createContext();

const GruposContextProvider = ({ children }) => {
    return (
        <GruposContext.Provider value={useFetch("grupos")}>
            {children}
        </GruposContext.Provider>
    );
};

export { GruposContext, GruposContextProvider };

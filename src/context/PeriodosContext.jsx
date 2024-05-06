import { createContext } from "react";
import { useFetch } from "../hooks";

//creacion de un nuevo contexto
const PeriodosContext = createContext();

const PeriodosContextProvider = ({ children }) => {
    return (
        <PeriodosContext.Provider value={useFetch("periodos")}>
            {children}
        </PeriodosContext.Provider>
    );
};

export { PeriodosContext, PeriodosContextProvider };

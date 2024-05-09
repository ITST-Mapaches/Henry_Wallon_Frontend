import { createContext } from "react";
import { useAuthManager } from "../hooks";

//creacion de un nuevo contexto
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={useAuthManager()}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };

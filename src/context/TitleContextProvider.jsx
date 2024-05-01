import { createContext, useState } from "react";

//creacion de un nuevo contexto
const TitleContext = createContext();

const title = () => {
  // estado para titulo
  const [title, setTitle] = useState("");

  // retorna el titulo con su funcion para alterarlo
  return { title, setTitle};
};

// funcion proveedora de contexto
const TitleContextProvider = ({ children }) => {
  return (
    <TitleContext.Provider value={title()}>{children}</TitleContext.Provider>
  );
};

export {TitleContext, TitleContextProvider};

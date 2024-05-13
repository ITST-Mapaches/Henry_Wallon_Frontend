import { Navigate, Route, Routes } from "react-router-dom";

import { Sidebar, Home, Users, Asignaturas, Grupos, PeriodosEscolares, PeriodoEvaluaciones} from "../../components/Administrator/";
import { Navbar } from "../../components/commons";
import {UsersContextProvider} from "../../context/UsersContextProvider";
import { AsignaturasContextProvider } from "../../context/AsignaturasContextProvider";
import { GruposContextProvider } from "../../context/GruposContextProvider";
import { PeriodosContextProvider } from "../../context/PeriodosContext";

const Administrator = () => {
  return (
    <>
      {/* elementos base */}
      <Navbar />
      <Sidebar />

      {/* rutas */}
      <Routes>
        <Route path="inicio" element={< Home />} />
        <Route
          path="usuarios"
          element={
            <UsersContextProvider>
              <Users />
            </UsersContextProvider>
          }
        />

        <Route path="asignaturas" 
          element={
            <AsignaturasContextProvider>
              <Asignaturas />
            </ AsignaturasContextProvider>
            } 
          />

        <Route path="grupos" 
          element={
            <GruposContextProvider>
              <Grupos />
            </GruposContextProvider>
          } 
          />
        
        <Route path="periodos" 
          element={
            < PeriodosContextProvider >
              <PeriodosEscolares />
            </ PeriodosContextProvider >
          } 
        />

        <Route path="periodoevaluaciones" element={< PeriodoEvaluaciones />} />
        
        <Route path="/*" element={< Navigate to='inicio' />} />
      </Routes>
    </>
  );
};

export default Administrator;

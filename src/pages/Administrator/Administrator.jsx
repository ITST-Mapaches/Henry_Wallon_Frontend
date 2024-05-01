import { Route, Routes } from "react-router-dom";

import { Sidebar, Users, Asignaturas, Grupos, PeriodosEscolares} from "../../components/Administrator/";
import { Navbar } from "../../components/commons";
import UsersContextProvider from "../../context/UsersContextProvider";

const Administrator = () => {
  return (
    <>
      {/* elementos base */}
      <Navbar />
      <Sidebar />

      {/* rutas */}
      <Routes>
        <Route
          path="usuarios"
          element={
            <UsersContextProvider>
              <Users />
            </UsersContextProvider>
          }
        />

        <Route path="asignaturas" element={<Asignaturas />} />
        <Route path="grupos" element={<Grupos />} />
        <Route path="periodos" element={<PeriodosEscolares />} />
      </Routes>
    </>
  );
};

export default Administrator;

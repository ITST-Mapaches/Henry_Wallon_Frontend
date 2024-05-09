import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import "./App.css";
import Administrator from "./pages/Administrator/Administrator";
import { TitleContextProvider } from "./context/TitleContextProvider";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";

function App() {
  const ProveedorTitle = ({ children }) => {
    return <TitleContextProvider>{children}</TitleContextProvider>;
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        
          {/* administrador */}
          <Route
            path="/administrador/*"
            element={
              < ProtectedRoute isAllowed={!!user && user.rol === 'Administrador' } >
                <ProveedorTitle>
                  <Administrator />
                </ProveedorTitle>
              </ ProtectedRoute  >
            }
          />
          {/* docentes */}
          {/* <Route path="/Docente/*" element={<Docente>>} /> */}
          {/* usuarios */}
          {/* <Route path="/usuarios/*" element={<Usuarios />} /> */}
      </Routes>
    </>
  );
}

export default App;

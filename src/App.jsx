import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import "./App.css";
import { TitleContextProvider } from "./context/TitleContextProvider";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";
import { Administrator, Docente, Alumnos, Tutor } from "./pages/";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* administrador */}
        <Route
          path="/administrador/*"
          element={
            <ProtectedRoute isAllowed={!!user && user.rol === "Administrador"}>
              <TitleContextProvider>
                <Administrator />
              </TitleContextProvider>
            </ProtectedRoute>
          }
        />
        {/* docentes */}
        <Route
          path="/docente"
          element={
            <ProtectedRoute isAllowed={!!user && user.rol === "Docente"}>
              <TitleContextProvider>
                <Docente user={user} />
              </TitleContextProvider>
            </ProtectedRoute>
          }
        />
        {/* alumnos */}
        <Route
          path="/alumno"
          element={
            <ProtectedRoute isAllowed={ !!user &&  user.rol === "Alumno" }>
              <TitleContextProvider>
                <Alumnos user={user} />
              </TitleContextProvider>
            </ProtectedRoute>
          }
        />
        {/* tutores */}
        <Route
          path="/tutor"
          element={
            <ProtectedRoute isAllowed={ !!user &&  user.rol === "Tutor" }>
              <TitleContextProvider>
                <Tutor user={user} />
              </TitleContextProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

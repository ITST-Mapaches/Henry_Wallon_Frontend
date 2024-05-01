import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import "./App.css";
import Administrator from "./pages/Administrator/Administrator";
import { TitleContextProvider } from "./context/TitleContextProvider";

function App() {
  const ProveedorTitle = ({ children }) => {
    return <TitleContextProvider>{children}</TitleContextProvider>;
  };

  return (
    <>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        {/* administrador */}
        <Route path="/administrador/*" element={<ProveedorTitle><Administrator /></ProveedorTitle>}/>
        {/* docentes */}
        {/* <Route path="/docentes/*" element={<Docentes />} /> */}
        {/* usuarios */}
        {/* <Route path="/usuarios/*" element={<Usuarios />} /> */}
      </Routes>
    </>
  );
}

export default App;

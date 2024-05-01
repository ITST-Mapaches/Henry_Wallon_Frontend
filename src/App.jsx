import { Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import "./App.css";
import Administrator from "./pages/Administrator/Administrator";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login/*" element={< Login />} />
        {/* administrador */}
        <Route path="/administrador/*" element={< Administrator />} />
        {/* usuarios */}
        {/* <Route path="/usuarios" element={< Usuarios />} /> */}
      </Routes>
    </>
  );
}

export default App;

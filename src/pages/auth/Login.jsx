import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { Navigate} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
const Login = () => {

  //estado para manejar el redireccionamiento
  const [loggedIn, setLoggedIn] = useState(false);

  //accediendo a contexto de auth
  const {user,setUser} = useContext(AuthContext);

  //uso de custom hook para manejar formularios
  const {form, nombre_usuario, password, onInputChange, onResetForm } = useForm({
    nombre_usuario: "",
    password: "",
  });

  // funcion para manejar el envio del formulario
  const onSubmit = async (event) => {
    event.preventDefault();

    setUser(null);

    try{
      //peticion post con la data
      const response = await axios.post(import.meta.env.VITE_BASE_URL + 'login', form);

      //desestructuramos la respuesta      
      const {status, data} = response;

      //validamos si el estatus
      if (status === 200) {
        
        // mensaje
        toast.success("Bienvenido!");
        
        onResetForm();

        // definimos un usuario en el contexto
        setUser({id: data['id'], rol: data['rol'], token: data['token'] });

        // Aquí establecemos loggedIn a true para redirigir
        setLoggedIn(true);
      }

    } catch (error) {
      //mensaje
      toast.error(error.response.data.message);
    }
  };

  if (loggedIn) {
    return <Navigate to={`/${ user.rol.toLowerCase() }`} />;
  }

  return (
    <>
      <div className="login">
        {/* mitad */}
        <figure className="login__image-school"></figure>
        {/* mitad */}
        <div className="login__form-section">
          <div className="login__form-container">
            <img className="login_icon" src="assets/images/favicon.svg" alt="Logo escuela"/>
            <h2 className="login__title">Bienvenido</h2>
            <form className="login__form" onSubmit={onSubmit}>
              <div className="login__item">
                <label htmlFor="nombre_usuario" className="login__label">
                  Nombre de usuario
                </label>
                <input id="nombre_usuario" name="nombre_usuario" onChange={onInputChange} type="text" className="login__input" placeholder="Ingresa tu nombre de usuario" required minLength={5} value={nombre_usuario} autoComplete="true"/>
              </div>
              <div className="login__item">
                <label htmlFor="password" className="login__label">
                  Contraseña
                </label>
                <input id="password" name="password" onChange={onInputChange} type="password" className="login__input" placeholder="••••••••••" required  minLength={5} value={password} autoComplete="true"/>
              </div>
              <button className="login__button">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default Login;

import { useForm } from "../../hooks/useForm";

import "./Login.css";
const Login = () => {
  //uso de custom hook para manejar formularios
  const { username, password, onInputChange, onResetForm } = useForm({
    username: "",
    password: "",
  });

  // funcion para manejar el envio del formulario
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
              <label htmlFor="" className="login__label">
                Nombre de usuario
              </label>
              <input name="username" onChange={onInputChange} type="text" className="login__input" placeholder="Ingresa tu nombre de usuario" required minLength="5" value={username}/>
            </div>
            <div className="login__item">
              <label htmlFor="" className="login__label">
                Contraseña
              </label>
              <input name="password" onChange={onInputChange} type="password" className="login__input" placeholder="••••••••••" required minLength="5" value={password}/>
            </div>
            <button className="login__button">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

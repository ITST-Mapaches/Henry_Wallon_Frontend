import { Link } from "react-router-dom";

const Index = ({user}) => {

    const urls = {
        Docente: '/docente',
        Administrador: '/administrador/inicio',
        Alumno: '/alumno',
        Tutor: '/tutor'
    };

    return (
        <div className="w-full h-dvh flex justify-center items-center">
            <div className="w-1/2 py-8 px-5 flex flex-col items-center">
                <figure className="flex flex-col items-center gap-6 mb-8 translate-x-[100vw] animate-traslate_x opacity-0">
                    <img src="./assets/images/favicon.svg" alt="logo de henry wallon" className="w-1/4" />
                    <figcaption className="text-center font-bold text-2xl text-primary">
                        Bienvenido al sistema de calificaciones del Instituto Henry Wallon
                        Preparatoria.
                    </figcaption>
                </figure>
                <Link to={user ? urls[user.rol] : '/login'} className="-translate-x-[100vw] animate-traslate_x rounded-lg text-white bg-third py-2 px-4 text-base font-bold  hover:scale-105 active:scale-95">
                    Iniciar
                </Link>
            </div>
        </div>
    );
};

export default Index;

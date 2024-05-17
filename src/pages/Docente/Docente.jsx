import { useContext, useEffect } from 'react';
import { Loader, NavbarCentered, Vacio } from '../../components/commons'
import { TitleContext } from '../../context/TitleContextProvider';
import { useFetch } from "../../hooks";
import {CardMatter} from '../../components/Docente/';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Docente = ({user}) => {
    const {data: asignaturas, isLoading} = useFetch(`getMattersByDocent/${user.id}`);

    // accediento al modificador de titulo del contexto para cambiarlo según sea el caso
    const {setTitle} = useContext(TitleContext);

    // objeto que representa la url actual en el navegador
    const location = useLocation();
    
    useEffect(
        () => { setTitle("Bienvenido") }
        ,[location.pathname, setTitle]);

    return (
        <>
            {/* elementos base */}
            <NavbarCentered />

            <div className="p-4">
                <div className="p-4 mt-14">
                    <p className='w-full mb-12 text-center'>Aquí puedes ver las asignaturas que impartes, en la esquina superior izquierda podrás ver el periodo escolar acompañado del grupo.</p>
                    {isLoading 
                        ? < Loader /> 
                        : ( (asignaturas.length > 0) 
                            ? <div className="cards_container">  {asignaturas.map(asignatura => < CardMatter key={asignatura.clave + asignatura.periodo + asignatura.grupo} {...asignatura} />  )}  </div>
                            : < Vacio /> ) 
                    }
                    <Toaster position="bottom-right" reverseOrder={false} />
                </div>
            </div>
        </>
    )
}

export default Docente

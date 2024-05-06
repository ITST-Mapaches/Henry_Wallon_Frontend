import CommonsSidebar from "../commons/CommonsSidebar";
import {NavLink} from "react-router-dom";
import { TitleContext } from "../../context/TitleContextProvider";
import { useContext } from "react";

const Sidebar = () => {
    // accediento al modificador de titulo del contexto para cambiarlo según sea el caso
    const {setTitle} = useContext(TitleContext);

    return (
        <CommonsSidebar>
            {/* users */}
            <li>
                <NavLink to="usuarios" className={({ isActive }) =>{ isActive ? setTitle('Usuarios') : '' ; return `flex items-center p-2 text-white rounded-lg hover:bg-slate-600 hover:scale-105 group active:scale-95 active:rounded-r-lg ${isActive ? "bg-slate-600" : ""} `}} >
                    <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <span className="ms-3">Usuarios</span>
                </NavLink>
            </li>
            {/* asignaturas */}
            <li>
                <NavLink to="asignaturas" className={({ isActive }) =>{ isActive ? setTitle('Asignaturas') : '' ; return `flex items-center p-2 text-white rounded-lg hover:bg-slate-600 hover:scale-105 group active:scale-95 active:rounded-r-lg ${isActive ? "bg-slate-600" : ""} `}} >
                    <svg className="w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className="ms-3">Asignaturas</span>
                </NavLink>
            </li>
            {/* grupos */}
            <li>
                <NavLink to="grupos" className={({ isActive }) =>{ isActive ? setTitle('Grupos') : '' ; return `flex items-center p-2 text-white rounded-lg hover:bg-slate-600 hover:scale-105 group active:scale-95 active:rounded-r-lg ${isActive ? "bg-slate-600" : ""} `}} >
                    <svg className="w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <span className="ms-3">Grupos</span>
                </NavLink>
            </li>
            {/* periodos escolares */}
            <li>
                <NavLink to="periodos" className={({ isActive }) =>{ isActive ? setTitle('Periodos') : '' ; return `flex items-center p-2 text-white rounded-lg hover:bg-slate-600 hover:scale-105 group active:scale-95 active:rounded-r-lg ${isActive ? "bg-slate-600" : ""} `}} >
                    <svg className="w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">                
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <span className="ms-3">Periodos Escolares</span>
                </NavLink>
            </li>
        </CommonsSidebar>
    );
}

export default Sidebar

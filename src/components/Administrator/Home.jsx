import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import Loader from '../commons/Loader/Loader';

const Home = () => {

  const {data, isLoading}  = useFetch('getInformationRelevant');

  return (
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
        <h2 className='mb-6'>En esta sección puedes ver un poco de información más relevante sobre el sistema.</h2>
          {isLoading 
            && < Loader /> 
            ||
            (<div className="grid grid-cols-flex-grid gap-8">
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-rose-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_mujeres}</span> <br/> Mujeres
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-sky-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_hombres}</span> <br/> Hombres
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-lime-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_cuentas_activas}</span> <br/> Cuentas activas
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-red-600 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_cuentas_inactivas}</span> <br/> Cuentas inactivas
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-pink-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_administradores}</span> <br/> Administrador (es)
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-green-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_alumnos}</span> <br/> Alumno (s)
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                  <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-indigo-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                  <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                    <span className="text-4xl font-black">{data.numero_docentes}</span> <br/> Docente (s)
                  </h1>
                </div>
                <div className="div shadow-lg shadow-gray-300 h-[8em] w-[15em] bg-slate-200 m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 flex items-center justify-center cursor-pointer hover:scale-105">
                    <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-red-500 group-hover:scale-[800%] duration-500 z-[-1] op"></div>
                    <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em] text-center">
                      <span className="text-4xl font-black">{data.numero_tutores}</span> <br/> Tutor (es)
                    </h1>
                </div>
              </div>
            )
          }
        </div>
      </div>
  )
}

export default Home

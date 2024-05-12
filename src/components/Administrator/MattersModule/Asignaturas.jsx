import React, { useContext } from 'react'
import { Loader, Vacio } from '../../commons';
import {TableRowMatter, AgregarAsignatura} from '../';
import { AsignaturasContext } from '../../../context/AsignaturasContextProvider';

const Asignaturas = () => {

  const {data: asignaturas, isLoading: isLoadingAsignaturas} = useContext(AsignaturasContext);

  
  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 rounded-lg mt-14">

      < AgregarAsignatura />
        {isLoadingAsignaturas 
          ? ( <Loader />) 
          : asignaturas.length > 0 ? (
              <table className="m-auto text-center text-white">
              <thead className="after:content-[''] after:block after:h-4">
                <tr className="bg-primary">
                  <th className="p-4 rounded-s-2xl">Clave</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Objetivo</th>
                  <th className="p-4">Periodo</th>
                  <th className="p-4">Calificación <br /> aprobatoria</th>
                  <th className="p-4 rounded-r-2xl">Acciones</th>
                </tr>
              </thead>
              <tbody className="font-normal">
                {asignaturas.map((asignatura) => (
                  <TableRowMatter key={asignatura.id} {...asignatura} />
                ))}
              </tbody>
            </table>
            ) : (<Vacio />)
        }
    </div>
  </div>
  )
}


export default Asignaturas;

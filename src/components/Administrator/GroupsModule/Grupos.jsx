import AgregarGrupo from "./AgregarGrupo"
import { GruposContext } from "../../../context/GruposContextProvider";
import { Loader, Vacio } from "../../commons";
import { TableRowGroup } from "../";
import { useContext } from "react";

const Grupos = () => {

  const {data: grupos, isLoading: isLoadingGroups} = useContext(GruposContext);

  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 rounded-lg mt-14">
    <h2 className='mb-6'>En esta sección puedes administrar grupos.</h2>
        < AgregarGrupo />
        {isLoadingGroups 
          ? < Loader />
          : grupos.length > 0 ? (
              <table className="m-auto text-center text-white">
                <thead className="after:content-[''] after:block after:h-4">
                  <tr className="bg-primary">
                    <th className="p-4 rounded-s-2xl">ID</th>
                    <th className="p-4">Prefijo</th>
                    <th className="p-4 rounded-r-2xl">Acciones</th>
                  </tr>
                </thead>
                <tbody className="font-normal">
                  { grupos.map(grupo => 
                    < TableRowGroup key={grupo.id} {...grupo} />
                  ) }
                </tbody>
              </table>
          ) : (< Vacio />)
        }
    </div>
  </div>
  )
}

export default Grupos

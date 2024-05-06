import { useContext } from "react";
import { PeriodosContext } from "../../../context/PeriodosContext";
import { Loader, Vacio } from "../../commons";
import { AgregarPeriodo, TableRowPeriod } from "../";

const PeriodosEscolares = () => {

  const {data: periodos, isLoading: isLoadingPeriods}  = useContext(PeriodosContext);

  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 rounded-lg mt-14">
        < AgregarPeriodo />

        {
          isLoadingPeriods 
            ? < Loader />
            : periodos.length > 0 ? (
              <table className="m-auto text-center text-white animate-jump-in">
                <thead className="after:content-[''] after:block after:h-4">
                  <tr className="bg-primary">
                    <th className="p-4 rounded-s-2xl">ID</th>
                    <th className="p-4">Número</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Fecha inicio</th>
                    <th className="p-4">Fecha fin</th>
                    <th className="p-4 rounded-r-2xl">Acciones</th>
                  </tr>
                </thead>
                <tbody className="font-normal">
                    {periodos.map(periodo => 
                      < TableRowPeriod key={periodo.id} {...periodo} />
                    )}
                </tbody>
              </table>
            ) : < Vacio />
        }
    </div>
  </div>
  )
}

export default PeriodosEscolares

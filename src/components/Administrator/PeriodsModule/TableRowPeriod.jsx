import { useContext } from "react";
import { ModalViewPeriod} from "../"
import { PeriodosContext } from "../../../context/PeriodosContext";
import { DeleteModal } from '../../commons/';

const TableRowPeriod = ({id, numero, nombre_tipo, fecha_inicio, fecha_fin}) => {
    const { getFetch: reFetchPeriodos } = useContext(PeriodosContext);
    return (
        <>
            <tr className="bg-primary">
                <td className="p-4 rounded-s-2xl text-left">
                    <div className="flex items-center">
                        <span className="rounded-full h-12 w-12 shadow-sm shadow-white text-primary bg-white flex items-center justify-center font-bold text-lg">
                            {id}
                        </span>
                        {/* <div className="ml-3">
                            {clave}
                        </div> */}
                    </div>
                </td>
                <td className="p-4">
                    <span className="px-2">{numero}</span>
                </td>
                <td className="p-4">
                    <span className="px-2">{nombre_tipo}</span>
                </td>
                <td className="p-4">
                    <span className="px-2">{fecha_inicio}</span>
                </td>
                <td className="p-4">
                    <span className="px-2">{fecha_fin}</span>
                </td>
                <td className="p-4 rounded-r-2xl">
                    <div className="flex gap-4 items-center">
                        < ModalViewPeriod id={id} />
                        < DeleteModal endpoint={`periodos/${id}`} elementDelete="periodo escolar" infoDelete={`${numero} - ${nombre_tipo}`} callbackReloadData={() => { reFetchPeriodos() }} />
                    </div>
                </td>
            </tr>
            <tr className="h-4"></tr>
        </>
    )
}

export default TableRowPeriod

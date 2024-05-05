import {ModalViewMatter, MatterModalEliminar} from "../"
import { Popover } from "flowbite-react"

const TableRowMatter = ({id, clave, nombre, objetivo, id_periodo, calificacion_aprobatoria}) => {
    return (
        <>
            <tr className="bg-primary">
                <td className="p-4 rounded-s-2xl text-left">
                    <div className="flex items-center">
                        <span className="rounded-full h-12 w-12 shadow-sm shadow-white text-primary bg-white flex items-center justify-center font-bold text-lg">
                            {id}
                        </span>
                        <div className="ml-3">
                            {clave}
                        </div>
                    </div>
                </td>
                <td className="p-4">
                <span className="px-2">{nombre}</span>
                </td>
                <td className="p-4 max-w-96">
                    <Popover content={
                    <p className="p-2 text-primary max-w-80 max-h-80 overflow-scroll">
                    {objetivo}
                    </p>
                    } placement='right' trigger="hover">
                        <button className="hover:scale-1" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"
                            className="w-7 h-7 hover:scale-110 hover:text-yellow-200 active:scale-95 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        </button>
                    </Popover>
                </td>
                <td className="p-4">
                <span className="px-2">{id_periodo}</span>
                </td>
                <td className="p-4">
                <span className="px-2">{calificacion_aprobatoria}</span>
                </td>

                <td className="p-4 rounded-r-2xl">
                <div className="flex gap-4 items-center">
                    <ModalViewMatter id={id} />
                    <MatterModalEliminar id={id} clave={clave} />
                </div>
                </td>
            </tr>
            <tr className="h-4"></tr>
        </>
    )
}

export default TableRowMatter

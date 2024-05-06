import {UpdateGroup, ModalEliminarGroup} from '../';

const TableRowGroup = ({id, prefijo}) => {
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
                    <span className="px-2">"{prefijo}"</span>
                </td>
                <td className="p-4 rounded-r-2xl">
                    <div className="flex gap-4 items-center">
                        <UpdateGroup id={id} prefij={prefijo}/>
                        <ModalEliminarGroup id={id} prefijo={prefijo} />
                    </div>
                </td>
            </tr>
            <tr className="h-4"></tr>
        </>
    )
}

export default TableRowGroup

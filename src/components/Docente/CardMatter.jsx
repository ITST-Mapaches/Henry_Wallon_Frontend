import { Button, Modal, Kbd } from "flowbite-react";
import { useState } from "react";
import Loader from "../commons/Loader/Loader";
import { useFetch } from "../../hooks";
import { Vacio } from "../commons";
import { TableRowStudent } from './';


const FetchUsers = ({id_asignatura, num_period, pref_grupo}) => { 
    // peticion al endpoint que retorna los alumnos de acuerdo a la materia, grupo y periodo
    const {data: users, isLoading } = useFetch(`getMomentosBySubjectGroupPeriod/${id_asignatura}/${num_period}/${pref_grupo}`);

    return(
        <>
            {isLoading 
                ? < Loader /> 
                : (users.length > 0 
                    ? (
                        <table className="m-auto text-center text-white">
                            <thead className="after:content-[''] after:block after:h-4">
                                <tr className="bg-slate-300 text-primary">
                                <th className="px-6 py-2 rounded-s-md">Número control</th>
                                <th className="px-6 py-2">Nombre</th>
                                <th className="px-6 py-2">Primer momento</th>
                                <th className="px-6 py-2">Segundo momento</th>
                                <th className="px-6 py-2">Tercer momento</th>
                                <th className="px-6 py-2 rounded-r-md">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="font-normal">
                                {users.map((user) => (
                                <TableRowStudent key={user.num_control} id_asignatura={id_asignatura} {...user} />
                                ))}
                            </tbody>
                        </table>
                    )
                    : < Vacio />
                )
            }
        </>
    );
};

const CardMatter = ({id, clave, asignatura, periodo, grupo }) => {

    // estado de modal
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button className="hover:scale-105 relative active:scale-95 border-none outline-none" onClick={() => { setOpenModal(true) }}>
                <span className='group-hover:text-primary w-12 h-12 flex items-center justify-center z-50 font-bold bg-third border-2 border-white rounded-full absolute -top-3 -left-3 text-primary'>{`${periodo} - ${grupo}`}</span>
                <div className="h-auto py-4 w-[15em] bg-primary border-2 border-primary rounded-3xl relative group p-2 z-0 overflow-hidden text-white">
                    <div className="h-[8em] w-[8em] bg-white rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"></div>
                    <div className="h-[7em] w-[7em] bg-[#FAFA00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"></div>
                    <div className="h-[6em] w-[6em] bg-[#FA170E] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"></div>
                    <h1 className="group-hover:text-primary z-20 font-bold mb-2 text-2xl duration-100 text-secondary"> {clave} </h1>
                    <h2 className='group-hover:text-primary mb-2 font-semibold'>{asignatura}</h2>
                </div>
            </button>
            {/* modal */}
            <Modal show={openModal} size="7xl" className="bg-black" popup>
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">{clave} - {asignatura}</h3>
                    <h2 className="font-semibold"> Periodo: {periodo} - Grupo: {grupo}</h2>

                    <FetchUsers id_asignatura={id} num_period={periodo} pref_grupo={grupo} />

                    {/* buttons */}
                    <div className="w-6/12 mx-auto mt-4 flex">
                        <Button color={""}  className="hover:scale-105 active:scale-95 text-white p-0  bg-red-600 hover:bg-red-800 mx-auto font-bold" onClick={() => {setOpenModal(false)}} accessKey="x">
                            <span className="mr-3 flex items-center justify-center">Cerrar</span> <Kbd className="px-1 py-1">Alt + X</Kbd>
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CardMatter

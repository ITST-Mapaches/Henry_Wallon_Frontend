import { toast, Toaster } from 'react-hot-toast';
import { useFetch, usePut } from '../../hooks'
import { Button , Modal} from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";


const PeriodoEvaluaciones = () => {
    // obtiene el dato si esta activo o no el periodo
    const  {data, isLoading, getFetch: reFetch} =  useFetch('periodocalificaciones');

    // estado para mostrar modal
    const [openModal, setOpenModal] = useState(false);

    const cambiarActivo = async() => { 
        try{
            // hace la peticion
            await usePut('periodocalificaciones');
            
            // cierra el modal
            setOpenModal(false);
            
            // envia mensaje de exito
            toast.success("Periodo de evaluaciones actualizado!");

            // hace el fetch del estado de evaluacion de nuevo
            reFetch();
        }catch(error){
            toast.error("Ha ocurrido un error al intentar actualizar!");
        }
        
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg mt-14">
                <h2 className='mb-6'>En esta sección puedes activar o desactivar el periodo de evaluación, si desactivas, los docentes no podrán evaluar a sus estudiantes.</h2>
                { 
                    isLoading ? ''  :   

                    data === 1 
                        ? 
                            (<>
                                <Button color="" className="mx-auto bg-red-600 font-semibold p-0 text-white hover:scale-105 active:scale-95 hover:bg-red-700" onClick={() => { setOpenModal(true) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="block w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                    <span className='ms-3 text-base'>Desactivar</span>
                                </Button>


                                <Modal className="bg-black" show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                <Modal.Header />
                                <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
                                    <h3 className="mb-5 text-lg font-bold text-primary">¿Estás seguro de que quieres desactivar el periodo de evaluación?</h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="" className="bg-red-600 font-semibold text-white hover:scale-105 active:scale-95 hover:bg-red-700" onClick={() => { cambiarActivo() }}>Sí, estoy seguro</Button>
                                        <Button color="" className="bg-sky-600 font-semibold text-white hover:scale-105 active:scale-95 hover:bg-sky-700" onClick={() => setOpenModal(false)}>No, cancelar</Button>
                                    </div>
                                </div>
                                </Modal.Body>
                                </Modal>
                            </>)
                        :
                        (
                            <Button color="" className="mx-auto bg-sky-600 font-semibold p-0 text-white hover:scale-105 active:scale-95 hover:bg-sky-700" onClick={() => { cambiarActivo() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <span className='ms-3 text-base'>Activar</span> 
                            </Button>
                        )
                }

                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </div>
    )
}

export default PeriodoEvaluaciones

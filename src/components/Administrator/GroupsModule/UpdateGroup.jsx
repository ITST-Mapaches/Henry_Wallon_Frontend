import { useState, useContext } from "react";
import { Modal, Label, TextInput, Tooltip, Button } from "flowbite-react";
import { GruposContext } from '../../../context/GruposContextProvider'
import { toast } from "react-hot-toast";
import { useForm, usePut } from "../../../hooks";

const UpdateGroup = ({id, prefij}) => {
    
    // estado para modal
    const [openModal, setOpenModal] = useState(false);

    // uso de custom hook para manipulación de formulario
    const {form, prefijo, onInputChange, onResetForm} = useForm({prefijo: prefij});

    const {getFetch: reFetchGrupos} = useContext(GruposContext);

    // estado para bloquear o desbloquear edición de campos
    const [bloquearEdit, setBloquearEdit] = useState(true);

    // manejo de formulario al enviar
    const onSubmit = async (event) => {
        // previene comportamiento por default de un form
        event.preventDefault();

        // cierra el modal
        setOpenModal(false);

        try{
            // envia el formulario al endpoint
            await usePut(`grupos/${id}`, form);

            //mensaje
            toast.success("Grupo agregado con éxito!");

            // limpia el formulario
            onResetForm();

            // recarga los grupos
            reFetchGrupos();

            // 
            setBloquearEdit(true);
        }catch (error) {
            toast.error("Error al intentar agregar grupo!");
        }

    }


    return (
        <>
            {/* button view */}
            <Tooltip content="Actualizar grupo" placement="left" style="light">
                <button className="hover:scale-1" onClick={() => {setOpenModal(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 hover:scale-105 active:scale-95 hover:text-yellow-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                </button>
            </Tooltip>

            <Modal show={openModal} size="sm" className="bg-primary" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Actualizar grupo</h3>
                    {/* form */}
                    <form onSubmit={onSubmit}>
                        {/* prefijo */}
                        <div className="mb-6">
                            <div className="mb-2 block">
                            <Label htmlFor="prefijo" value="Prefijo de grupo" />
                            </div>
                            <TextInput name="prefijo" id="prefijo" value={prefijo} onChange={onInputChange} placeholder="Ingresa el prefijo" maxLength={1} required disabled={bloquearEdit} addon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>}/>
                        </div>
                        {/* buttons */}
                        <div className="w-full mx-auto mt-12 flex justify-around">
                            <Tooltip content="Cancelar y cerrar" placement="bottom" style="dark">
                                <Button color="" className="hover:scale-105 active:scale-95 px-2  text-white inline-block bg-red-600 hover:bg-red-800 font-bold" onClick={() => { setOpenModal(false); setBloquearEdit(true); }}>Cancelar</Button>
                            </Tooltip>
                        </div>

                        <button type="button" className="text-gray-400 hover:text-gray-100 mt-4 hover:scale-1 absolute bottom-4 right-4" onClick={() => {setBloquearEdit(!bloquearEdit)}} title="Habilitar edición">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="rgb(125 211 252)" className="w-8 h-8 hover:scale-110 active:scale-95">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                        </button>

                        {(!bloquearEdit && (
                        <Button type="submit" className="active:scale-95 mt-4 px-2 bg-sky-600 mx-auto font-bold">
                            Actualizar
                        </Button>
                        )) ||
                        ""}
                    </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateGroup

import { useState, useContext } from "react";
import { Modal, Label, TextInput } from "flowbite-react";
import { GruposContext } from '../../../context/GruposContextProvider'
import { Toaster, toast } from "react-hot-toast";
import { useForm, usePost } from "../../../hooks";
import CustomButton from "../../commons/buttons/CustomButton";

const AgregarGrupo = () => {

    // estado para modal
    const [openModal, setOpenModal] = useState(false);

    // uso de custom hook para manipulación de formulario
    const {form, prefijo, onInputChange, onResetForm} = useForm({prefijo: ''});

    const {getFetch: reFetchGrupos} = useContext(GruposContext);

    // manejo de formulario al enviar
    const onSubmit = async (event) => {
        // previene comportamiento por default de un form
        event.preventDefault();

        // cierra el modal
        setOpenModal(false);

        try{
            // envia el formulario al endpoint
            await usePost('grupos', form);

            //mensaje
            toast.success("Grupo agregado con éxito!");

            // limpia el formulario
            onResetForm();

            reFetchGrupos();
        }catch (error) {
            toast.error("Error al intentar agregar grupo!");
        }

    }

    return (
        <>
        {/* button add  */}
        <button className='flex items-center w-fit m-auto p-2 bg-primary text-white rounded-lg group active:scale-95 hover:scale-105 active:rounded-r-lg mb-12' 
                onClick={() => { setOpenModal(true) }}>
                <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="ms-3 font-bold">Agregar grupo</span>
            </button>

            <Modal show={openModal} size="sm" className="bg-primary" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Agregar grupo</h3>
                    {/* form */}
                    <form onSubmit={onSubmit}>
                        {/* prefijo */}
                        <div className="mb-6">
                            <div className="mb-2 block">
                            <Label htmlFor="prefijo" value="Prefijo de grupo" />
                            </div>
                            <TextInput name="prefijo" id="prefijo" value={prefijo} onChange={onInputChange} placeholder="Ingresa el prefijo" maxLength={1} required addon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>}/>
                        </div>
                        {/* buttons */}
                        <div className="w-full mx-auto mt-12 flex justify-around">
                            < CustomButton className="bg-red-600 hover:bg-red-800" tooltip="Cancelar y cerrar" placement="left" mesagge="Cancelar" accessKey='x' callback={() => { setOpenModal(false) }} />
                            < CustomButton type="submit" className="bg-sky-600 hover:bg-sky-800" placement="right" tooltip="Agregar grupo" mesagge="Agregar" accessKey='s'/>
                        </div>
                    </form>
                    </div>
                </Modal.Body>
            </Modal>

            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    )
}

export default AgregarGrupo

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Textarea, Label, Button, Tooltip } from "flowbite-react";
import { useDelete, useForm, usePost, usePut } from "../../hooks";
import toast from "react-hot-toast";

const FormObservartion = ({existe, num_control, id_asignatura, id, descripcion: desc, setOpen, refetchSeguimiento}) => {
    // uso de contexto que contiene la informacion del usuario
    const {user} = useContext(AuthContext);

    // estado para bloquear o desbloquear input descripcion
    const [bloquearEdit, setBloquearEdit] = useState(existe);

    // manejo de formulario con custom hook
    const {form, descripcion, onInputChange} = useForm({descripcion: desc});

    // funcion que maneja en envío del formulario
    const onSubmit = async(event) => { 
        event.preventDefault();

        try {
            // define el endpoint a usar
            const endpoint = existe ? `seguimientos/${id}` : `seguimientos/${num_control}/${id_asignatura}/${user.id}`;

            // define la solicitud
            await (existe ? usePut(endpoint, form) : usePost(endpoint, form));

            // define el mensaje
            const mensaje = existe ? "Seguimiento actualizado con éxito!" : "Seguimiento registrado con éxito!";

            // cierra el popover
            setOpen(false);
            
            //mensaje de exito
            toast.success(mensaje);

            // vuelve a realizar el fetching del seguimiento
            refetchSeguimiento();
        } catch (error) {
            toast.error("Error al intentar actualizar seguimiento!");            
        }
    };

     // funcion para eliminar seguimiento
     const eliminarSeguimiento = async() => { 
        try{
            // uso de custom hook para eliminar
            await useDelete(`seguimientos/${id}`);
            
            //mensaje de exito
            toast.success("Seguimiento eliminado con éxito!");

            setOpen(false);

            refetchSeguimiento();
        }catch(error){
            //mensaje de error
            toast.success("Surgió un problema al intentar eliminar el seguimiento!");
        }
    };

    return (
        <>
            <form className="flex w-full flex-col gap-4 px-4 py-3 text-sm text-gray-500" onSubmit={onSubmit}>
                <div className="block">
                    <Label htmlFor="descripcion" value="Descripción" />
                </div>
                <Textarea id="descripcion" name="descripcion" value={descripcion} onChange={onInputChange} disabled={bloquearEdit} placeholder="Escribe la observación que tengas del estudiante en este lugar" rows={6} className="bg-slate-200"/>
                {/* buttons */}
                <div className="flex w-full justify-evenly">
                    <Button color="" className="hover:scale-105 active:scale-95 p-0  text-white inline-block bg-red-600 hover:bg-red-800 font-bold" onClick={() => { setOpen(false) }}>Cancelar</Button>
                    <Button type="submit" className="hover:scale-105 active:scale-95 p-0 border-none outline-none inline-block bg-sky-600 font-bold" disabled={bloquearEdit}>{existe ? 'Actualizar' : "Aceptar"}</Button>
                </div>
            </form>
            {existe &&
                <div className="absolute -bottom-3 right-0 flex flex-col gap-2 ">
                    <Tooltip content={bloquearEdit ? "Habilitar edición" : "Dehabilitar edición"} placement="top" style="light">
                        <button type="button" className="text-gray-400 hover:text-gray-100 hover:scale-1 " onClick={() => {setBloquearEdit(!bloquearEdit)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="rgb(125 211 252)" className="w-7 h-7 hover:scale-110 active:scale-95">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                        </button>
                    </Tooltip>
                    <Tooltip content="Eliminar seguimiento" placement="bottom" style="light">
                        <button type="button" className="hover:scale-1" onClick={() => { eliminarSeguimiento() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7 hover:scale-105 active:scale-95 text-rose-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                        </button>
                    </Tooltip>
                </div>
            || ''}
        </>
        
    )
}

export default FormObservartion

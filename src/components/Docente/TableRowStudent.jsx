import { useState } from "react"
import { TextInput, Tooltip} from "flowbite-react";
import { useForm, usePut } from "../../hooks";
import { AddObservation } from "./";
import toast from "react-hot-toast";

const TableRowStudent = ({periodo_activo, id_asignatura, num_control, nombre, cal_primer_momento: primer_momento,   cal_segundo_momento: segundo_momento,   cal_tercer_momento: tercer_momento}) => {

    // estado para bloquear o desbloquear edición de campos
    const [bloquearEdit, setBloquearEdit] = useState(true);

    // manejo de datos mediante custom hook
    const {form, cal_primer_momento, cal_segundo_momento, cal_tercer_momento, onInputChange} = useForm({cal_primer_momento: primer_momento,   cal_segundo_momento: segundo_momento,   cal_tercer_momento: tercer_momento});

    // funcion actualizar
    const updateScore = async() => { 
        try {
                // llamada a endpoint que actualiza las calificaciones del alumno
                await usePut(`momentos/${num_control}/${id_asignatura}`, form);
        
                //mensaje de exito
                toast.success("Calificaciones actualizadas con éxito");

                // bloqueo de nuevo de inputs
                setBloquearEdit(true);
            } catch (error) {
                // console.log(error);
                toast.error("Error al intentar actualizar calificaciones!");
            }
    };

    return (
        <>
            <tr className="bg-slate-200 text-primary">
                <td className="px-6 py-1 rounded-s-md text-left">
                    <div className="flex items-center">
                        <div className="ml-3 font-bold">
                            {num_control}
                        </div>
                    </div>
                </td>
                <td className="px-6 py-1">
                    <span className="px-2">{nombre}</span>
                </td>
                <td className="px-6 py-1 max-w-96">
                    <TextInput id="cal_primer_momento" name="cal_primer_momento" type="number" value={cal_primer_momento} min={0} max={10} onChange={onInputChange}  disabled={bloquearEdit} className="p-0 w-20 mx-auto"/>
                </td>
                <td className="px-6 py-1 max-w-96">
                    <TextInput id="cal_segundo_momento" name="cal_segundo_momento" type="number" value={cal_segundo_momento} min={0} max={10} onChange={onInputChange}  disabled={bloquearEdit} className="p-0 w-20 mx-auto"/>
                </td>
                <td className="px-6 py-1 max-w-96">
                    <TextInput id="cal_tercer_momento" name="cal_tercer_momento" type="number" value={cal_tercer_momento} min={0} max={10} onChange={onInputChange}  disabled={bloquearEdit} className="p-0 w-20 mx-auto"/>
                </td>
                <td className="px-6 py-1 rounded-r-md">
                    {/* buttons */}
                    <div className="flex gap-4 items-center">
                        {/* button save */}
                        <Tooltip content={bloquearEdit ? 'Deshabilitado' : 'Guardar cambios'} placement={bloquearEdit ? 'left' : 'bottom'} style="light">
                            <button className="hover:scale-110 active:scale-95 cursor-pointer" disabled={bloquearEdit} onClick={() => { updateScore() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${bloquearEdit ? 'text-gray-500' : 'text-purple-600'}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                                </svg>
                            </button>
                        </Tooltip>
                        {/* button edit */}
                        <Tooltip content={bloquearEdit ? 'Habilitar edición' : 'Deshabilitar edición'} placement="bottom" style="light">
                            <button className="hover:scale-110 active:scale-95 cursor-pointer" disabled={periodo_activo} onClick={() => { setBloquearEdit(!bloquearEdit) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-sky-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </Tooltip>
                        {/* button add observation */}
                       < AddObservation num_control={num_control} id_asignatura={id_asignatura}/>
                    </div>
                </td>
            </tr>
            <tr className="h-3"></tr>
        </>
    )
}

export default TableRowStudent
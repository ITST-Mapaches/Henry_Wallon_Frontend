import { useFetch, useForm, usePut } from "../../../hooks";
import { Label, Select, Button} from "flowbite-react";
import { Loader } from "../../commons";
import { toast } from "react-hot-toast";
import { useState } from "react";

const UpdateAsignacionDocentes = ({asignaturaDatetails, setOpenModal}) => {
    // estado para bloquear o desbloquear edición de campos
    const [bloquearEdit, setBloquearEdit] = useState(true);

    // fetching a endpoint de docentes
    const { data: docentes, isLoading: isLoadingDocentes } = useFetch("getUsuarios/docentes");

    // fetching a endpoint de grupos
    const { data: grupos, isLoading: isLoadingGrupos } = useFetch("grupos");

    // manejo de estado de formulario con custom hook
    const { form, onInputChange, onResetForm} = useForm({});


    // manejo de formulario al enviar
    const onSubmit = async (event) => {
        // previene comportamiento por default de un form
        event.preventDefault();

        // cierra el modal
        setOpenModal(false);

        try {
        //nuevo formulario, agregando el id de la materia al form
        const formulario = {...form, id_materia: asignaturaDatetails[0].id_asignatura};

        // envia el formulario al endpoint para actualizar
        await usePut("asignaturadocentegrupo", formulario);

        //mensaje
        toast.success("Información actualizada con éxito!");

        // limpia el formulario
        onResetForm();
        } catch (error) {
        toast.error("Error al intentar actualizar la información!");
        }
    };

    return (
        //{/* form */}
        <form onSubmit={onSubmit}>
            {/* si se estan cargando los docentes o grupos muestra el loader */}
            {(isLoadingDocentes || isLoadingGrupos) ? <Loader /> 
            : (
                <>
                    {/* recorriendo grupos  */}
                    {grupos.map((grupo) => {
                        // verifica si el grupo actual tiene 
                        const existe = asignaturaDatetails.find(asig => asig.id_grupo === grupo.id);

                        return (
                            <div className="mb-6" key={grupo.id}>
                                <div className="mb-2 block">
                                    <Label htmlFor={grupo.id} value={`Docente para grupo: ${grupo.prefijo}`}/>
                                </div>
                                <Select id={grupo.id} name={grupo.id} onChange={onInputChange} required disabled={bloquearEdit} addon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>}>
                                    <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                                    {/* Recorriendo docentes */}
                                    {docentes.map((docente) =>
                                        <option id={docente.id_docente} key={docente.id_docente} value={docente.id_docente} selected={(existe && existe.id_docente === docente.id_docente)}
                                        >
                                            {docente.id_docente + " - " + docente.name}
                                        </option>
                                    )}
                                </Select>
                            </div>
                        );
                    })}

                     {/* button edit */}
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
                </>
            )}
        </form>
    );
};

export default UpdateAsignacionDocentes;

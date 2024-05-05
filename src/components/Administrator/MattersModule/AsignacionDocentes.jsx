import { useFetch, useForm } from "../../../hooks";
import { Modal, Label, Select, Tooltip, Button} from "flowbite-react";
import { Loader } from "../../commons";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const AsignacionDocentes = ({id, nombre, openDocentes, setOpenDocentes}) => {
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
        setOpenDocentes(false);

        try {
        //nuevo formulario, agregando el id de la materia al form
        const formulario = {...form, id_materia: id};

        // envia el formulario al endpoint
        await axios.post(import.meta.env.VITE_BASE_URL + "asignaturadocentegrupo", formulario);

        //mensaje
        toast.success("Información registrada con éxito!");

        // limpia el formulario
        onResetForm();
        } catch (error) {
        console.log(error);
        toast.error("Error al intentar registrada la información!");
        }
    };

    return (
        <>
            <Modal show={openDocentes} size="xl" className="bg-primary" popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Asignación de docente por grupo</h3>
                <p>
                    Seleccione el docente que estará autorizado para impartir la
                    asignatura por cada grupo.
                    <br />

                    <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-600 relative block w-fit mx-auto mt-4">
                        <span class="relative text-white font-semibold">Materia: {id + " - " + nombre}</span>
                    </span>
                </p>
                {/* form */}
                <form onSubmit={onSubmit}>
                    {/* si se estan cargando los docentes o grupos muestra el loader */}
                    {((isLoadingDocentes || isLoadingGrupos) && <Loader />) || (
                    <>
                        {/* recorriendo grupos  */}
                        {grupos.map((grupo) => (
                        <div className="mb-6" key={grupo.id}>
                            <div className="mb-2 block">
                                <Label htmlFor={grupo.id} value={`Docente para grupo: ${grupo.prefijo}`}/>
                            </div>
                            <Select id={grupo.id} name={grupo.id} onChange={onInputChange} required addon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>}>
                                <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                                {docentes.map((docente) => (
                                    <option id={docente.id} key={docente.id} value={docente.id}>{docente.id + " - " + docente.name}</option>
                                ))}
                            </Select>
                        </div>
                        ))}

                        {/*buttons */}
                        <div className="w-full mx-auto mt-4 flex justify-around">
                            <Tooltip content="Confirmar asignaciones y cerrar" placement="bottom" style="dark">
                                <Button type="submit" className="hover:scale-105 active:scale-95 px-2 inline-block bg-sky-600 font-bold">Confirmar</Button>
                            </Tooltip>
                        </div>
                    </>
                    )}
                </form>
                </div>
            </Modal.Body>
            </Modal>
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
};

export default AsignacionDocentes;

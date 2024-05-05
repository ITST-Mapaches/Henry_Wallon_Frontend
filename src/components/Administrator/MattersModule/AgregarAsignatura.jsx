import { Modal, Label, TextInput, Textarea, Select, Tooltip, Button } from "flowbite-react";
import { AsignaturasContext } from "../../../context/AsignaturasContextProvider";
import AsignacionDocentes from "./AsignacionDocentes";
import { useForm, useFetch } from "../../../hooks";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useState } from "react";
import axios from "axios";


const AgregarAsignatura = () => {

    // manejo de estado de formulario con custom hook
    const {form, clave, nombre, objetivo, id_periodo, calificacion_aprobatoria, onInputChange, onResetForm} = useForm({clave: '', nombre: '', objetivo: '', id_periodo: '', calificacion_aprobatoria: ''});

    // fetching de data a endpoint periodos
    const { data: periodos, isLoading: isLoadingPeriodos } = useFetch("periodos");

    //uso de contexto de asignaturas
    const {getFetch: cargarAsignaturas } = useContext(AsignaturasContext);

    // estado de modal
    const [openModal, setOpenModal] = useState(false);
    
    //estado segundo modal
    const [openDocentes, setOpenDocentes] = useState(false);

    const [materia, setMateria] = useState({id: null, nombre: null});

    // manejo de formulario al enviar
    const onSubmit = async (event) => {
        // previene comportamiento por default de un form
        event.preventDefault();

        // cierra el modal
        setOpenModal(false);

        try {
        // envia el formulario al endpoint
        const response = await axios.post(import.meta.env.VITE_BASE_URL + 'asignaturas', form);
        
        const {data} = response.data;

        setMateria(data);
        
        //mensaje
        toast.success("Materia agregada con éxito!");
        
        // limpia el formulario
        onResetForm();
        
        //activa que se muestre el modal de docentes
        setOpenDocentes(true);

        // vuelve a cargar las materias en el contexto
        cargarAsignaturas();

        } catch (error) {
        toast.error("Error al intentar agregar materia!");
        }
    };


    return (
        <>
            {/* button add  */}
            <button className='flex items-center w-fit m-auto p-2 bg-primary text-white rounded-lg group active:scale-95 hover:scale-105 active:rounded-r-lg mb-12' 
                onClick={() => { setOpenModal(true) }}>
                <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="ms-3 font-bold">Agregar asignatura</span>
            </button>
        

            {
                openDocentes ?
                < AsignacionDocentes id={materia.id} nombre={materia.nombre} openDocentes={openDocentes} setOpenDocentes={setOpenDocentes} /> 
                :
                (
                
                <Modal show={openModal} size="xl" className="bg-primary" popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">Agregar asignatura</h3>
                        {/* form */}
                        <form onSubmit={onSubmit}>
                            {/* clave */}
                            <div className="mb-6">
                                <div className="mb-2 block">
                                <Label htmlFor="clave" value="Clave de asignatura" />
                                </div>
                                <TextInput name="clave" id="clave" value={clave} onChange={onInputChange} placeholder="Ingresa la clave" maxLength={10} required addon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                </svg>}/>
                            </div>
                            {/* nombre */}
                            <div className="mb-6">
                                <div className="mb-2 block">
                                <Label htmlFor="nombre" value="Nombre de asignatura" />
                                </div>
                                <TextInput name="nombre" id="nombre" value={nombre} onChange={onInputChange} placeholder="Ingresa el nombre" maxLength={50} required addon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>}/>
                            </div>
                            <div className="flex w-full justify-between">
                                {/* calificacion_aprobatoria */}
                                <div className="mb-6">
                                    <div className="mb-2 block">
                                    <Label htmlFor="calificacion_aprobatoria" value="Calificación aprobatoria de asignatura" />
                                    </div>
                                    <TextInput type="number" name="calificacion_aprobatoria" id="calificacion_aprobatoria" value={calificacion_aprobatoria} onChange={onInputChange} placeholder="Ingresa la calificación" max={10} min={6} required addon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>}/>
                                </div>
                                {/*  periodo */}
                                <div className="mb-6">
                                    <div className="mb-2 block">
                                        <Label htmlFor="id_periodo" value="Periodo" />
                                    </div>
                                    <Select id="id_periodo" name="id_periodo" onChange={onInputChange} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>}>
                                        <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                                        { isLoadingPeriodos && 'loading' || periodos.map( periodo => (
                                        <option id={periodo.id} key={periodo.id} value={periodo.id}>{periodo.id + " - " + periodo.nombre_tipo}</option>
                                        ) )}
                                    </Select>
                                </div>
                            </div>
                            {/* objetivo */}
                            <div className="mb-6">
                                <div className="mb-2 block">
                                <Label htmlFor="objetivo" value="Objetivo de asignatura" />
                                </div>
                                <Textarea name="objetivo" id="objetivo" value={objetivo} onChange={onInputChange} placeholder="Ingresa el objetivo" maxLength={1000} rows={6} required addon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>}/>
                            </div>
                            {/* buttons */}
                            <div className="w-full mx-auto mt-4 flex justify-around">
                            <Tooltip content="Cancelar y cerrar" placement="bottom" style="dark">
                                <Button color="" className="hover:scale-105 active:scale-95 px-2  text-white inline-block bg-red-600 hover:bg-red-800 font-bold" onClick={() => { setOpenModal(false) }}>Cancelar</Button>
                            </Tooltip>
                            <Tooltip content="Limpiar todo el formulario" placement="bottom" style="dark">
                                <Button color="" type="submit" className="hover:scale-105 active:scale-95 px-2 text-white  inline-block bg-yellow-300 hover:bg-yellow-400 font-bold" onClick={() => { onResetForm() }} >Limpiar</Button>
                            </Tooltip>
                            <Tooltip content="Agregar usuario y cerrar" placement="bottom" style="dark">
                                <Button type="submit" className="hover:scale-105 active:scale-95 px-2 inline-block bg-sky-600 font-bold">Confirmar</Button>
                            </Tooltip>
                            </div>
                        </form>
                        </div>
                    </Modal.Body>
                </Modal>
                )
            }

            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    )
}

export default AgregarAsignatura
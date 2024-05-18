import { Button, Label, TextInput, Select, Textarea} from "flowbite-react";
import { useState, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "../../../hooks/useForm";
import { toast } from "react-hot-toast";
import { AsignaturasContext } from "../../../context/AsignaturasContextProvider";
import { usePut } from "../../../hooks";
import CustomButton from "../../commons/buttons/CustomButton";

const UpdateMatter = ({ asignatura, setOpenModal }) => {
  //uso de contexto de asignaturas
  const {getFetch: cargarAsignaturas } = useContext(AsignaturasContext);

  // estado para bloquear o desbloquear edición de campos
  const [bloquearEdit, setBloquearEdit] = useState(true);

  // manejo de estado de formulario con custom hook
  const {form, clave, nombre, objetivo, id_periodo, calificacion_aprobatoria, onInputChange, onResetForm} = useForm({clave: asignatura.clave, nombre: asignatura.nombre, objetivo: asignatura.objetivo, id_periodo: asignatura.id_periodo, calificacion_aprobatoria: asignatura.calificacion_aprobatoria});

  // fetching de data a endpoint periodos
  const { data: periodos, isLoading: isLoadingPeriodos } = useFetch("periodos");

  // fetching de data a endpoint grupos
  const { data: grupos, isLoading: isLoadingGrupos } = useFetch("grupos");

  // manejo de formulario al enviar
  const onSubmit = async (event) => {
    // previene comportamiento por default de un form
    event.preventDefault();

    // cierra el modal
    setOpenModal(false);

    try {
      // envia el formulario al endpoint
      await usePut(`asignaturas/${asignatura.id}`, form);

      //mensaje
      toast.success("materia actualizada con éxito!");

      // vuelve a cargar las materias en el contexto
      cargarAsignaturas();
    } catch (error) {
      toast.error("Error al intentar actualizar materia!");
    }
  };

  return (
    <>
      {/* form */}
      <form onSubmit={onSubmit}>
        {/* clave */}
        <div className="mb-6">
            <div className="mb-2 block">
            <Label htmlFor="clave" value="Clave de asignatura" />
            </div>
            <TextInput name="clave" id="clave" value={clave} onChange={onInputChange} placeholder="Ingresa la clave" maxLength={10} required disabled={bloquearEdit} addon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>}/>
        </div>
        {/* nombre */}
        <div className="mb-6">
            <div className="mb-2 block">
            <Label htmlFor="nombre" value="Nombre de asignatura" />
            </div>
            <TextInput name="nombre" id="nombre" value={nombre} onChange={onInputChange} placeholder="Ingresa el nombre" maxLength={50} required disabled={bloquearEdit} addon={
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
                <TextInput type="number" name="calificacion_aprobatoria" id="calificacion_aprobatoria" value={calificacion_aprobatoria} onChange={onInputChange} placeholder="Ingresa la calificación" max={10} min={6} required disabled={bloquearEdit} addon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>}/>
            </div>
            {/*  periodo */}
            <div className="mb-6">
                <div className="mb-2 block">
                    <Label htmlFor="id_periodo" value="Periodo" />
                </div>
                <Select id="id_periodo" name="id_periodo" value={id_periodo} onChange={onInputChange} required disabled={bloquearEdit} addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
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
            <Textarea name="objetivo" id="objetivo" value={objetivo} onChange={onInputChange} placeholder="Ingresa el objetivo" maxLength={1000} rows={6} required disabled={bloquearEdit} addon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>}/>
        </div>


        {/* button edit */}
        <button type="button" className="text-gray-400 hover:text-gray-100 mt-4 hover:scale-1 absolute bottom-4 right-4" onClick={() => {setBloquearEdit(!bloquearEdit)}} title="Habilitar edición">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="rgb(125 211 252)" className="w-8 h-8 hover:scale-110 active:scale-95">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
          </svg>
        </button>

        {(!bloquearEdit && (
          <div className="flex justify-center">
            < CustomButton type="submit" className="bg-sky-600 hover:bg-sky-800 mt-4" tooltip="Actualizar asignatura" placement="right" mesagge="Actualizar" accessKey='s'/>
          </div>
        )) ||
          ""}
      </form>
      
    </>
  );
};

export default UpdateMatter;

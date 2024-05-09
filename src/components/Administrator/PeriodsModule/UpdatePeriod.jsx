import { Label, TextInput, Button, Datepicker } from "flowbite-react";
import { useState, useContext } from "react";
import { PeriodosContext } from "../../../context/PeriodosContext";
import { Toaster, toast } from "react-hot-toast";
import { useForm, usePut } from "../../../hooks";

const UpdatePeriod = ({id, numero: num, nombre_tipo: nt, fecha_inicio: fi, fecha_fin: ff, setOpenModal}) => {
    // uso de custom hook para manipulación de formulario
    const {form, numero, nombre_tipo, fecha_inicio, fecha_fin, onInputChange, onResetForm} = useForm({numero: num, nombre_tipo: nt, fecha_inicio: fi, fecha_fin: ff});


    const {getFetch: reFetchPeriodos} = useContext(PeriodosContext);

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
            await usePut(`periodos/${id}`, form);

            //mensaje
            toast.success("Periodo actualizado con éxito!");

            // limpia el formulario
            onResetForm();

            // periodos
            reFetchPeriodos();
        }catch (error) {
            toast.error("Error al intentar actualizar periodo!");
        }
    }

      // manejo de fecha
     // manejo de fecha
     const handleDateChangeInicio = (date) => {
        console.log(date)
        // console.log(date)
        const fecha = new Date(date);
        const año = fecha.getFullYear();
        // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        const fechaFormateada = `${año}-${mes}-${dia}`;
        // console.log(fechaFormateada); // "2023-11-13"

        onInputChange({ target: { name: "fecha_inicio", value: fechaFormateada } });
    };
    const handleDateChangeFin = (date) => {
        console.log(date)
        // console.log(date)
        const fecha = new Date(date);
        const año = fecha.getFullYear();
        // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        const fechaFormateada = `${año}-${mes}-${dia}`;
        // console.log(fechaFormateada); // "2023-11-13"

        onInputChange({ target: { name: "fecha_fin", value: fechaFormateada } });
    };

    return (
        <>
            <form className="min-h-[450px] flex flex-col justify-evenly" onSubmit={onSubmit}>
                {/* div fechas */}
                
                    {/* fecha inicio */}
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label htmlFor="fecha_inicio" value="Fecha inicio" />
                        </div>
                        <Datepicker id="fecha_inicio" name="fecha_inicio" value={fecha_inicio} disabled={bloquearEdit} onSelectedDateChanged={handleDateChangeInicio} language="es-MX" labelTodayButton="Hoy" icon="" labelClearButton="Limpiar"  required addon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>}/>
                    </div>
                    {/* fecha fin */}
                    <div className="mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="fecha_fin" value="Fecha fin" />
                    </div>
                    <Datepicker id="fecha_fin" name="fecha_fin" value={fecha_fin} disabled={bloquearEdit} onSelectedDateChanged={handleDateChangeFin} language="es-MX" labelTodayButton="Hoy" icon="" labelClearButton="Limpiar"  required addon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>}/>
                </div>
                
                {/* numero */}
                <div className="mb-6">
                    <div className="mb-2 block">
                    <Label htmlFor="numero" value="Número periodo" />
                    </div>
                    <TextInput type="number" name="numero" id="numero" value={numero} disabled={bloquearEdit} onChange={onInputChange} placeholder="Ingresa el número de periodo" min={1} max={12} required addon="#"/>
                </div>
                {/* nombre */}
                <div className="mb-6">
                    <div className="mb-2 block">
                    <Label htmlFor="nombre_tipo" value="Tipo" />
                    </div>
                    <TextInput name="nombre_tipo" id="nombre_tipo" value={nombre_tipo} disabled={bloquearEdit} onChange={onInputChange} placeholder="Ingresa el tipo de periodo" maxLength={20} required addon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>}/>
                </div>
                {/* buttons */}
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

            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    )
}

export default UpdatePeriod

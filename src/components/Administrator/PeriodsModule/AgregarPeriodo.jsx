import { Modal, Label, TextInput, Tooltip, Button, Datepicker } from "flowbite-react";
import { PeriodosContext } from "../../../context/PeriodosContext";
import { Toaster, toast } from "react-hot-toast";
import { useState, useContext } from "react";
import { useForm, usePost } from "../../../hooks";

const AgregarPeriodo = () => {
    // estado para modal
    const [openModal, setOpenModal] = useState(false);

    // uso de custom hook para manipulación de formulario
    const {form, numero, nombre_tipo, fecha_inicio, fecha_fin, onInputChange, onResetForm} = useForm({numero: '', nombre_tipo: '', fecha_inicio: '', fecha_fin: ''});

    const {getFetch: reFetchPeriodos} = useContext(PeriodosContext);

    // manejo de formulario al enviar
    const onSubmit = async (event) => {
        // previene comportamiento por default de un form
        event.preventDefault();

        // cierra el modal
        setOpenModal(false);

        try{
            // envia el formulario al endpoint
            await usePost('periodos', form)


            //mensaje
            toast.success("Periodo agregado con éxito!");

            // limpia el formulario
            onResetForm();

            // periodos
            reFetchPeriodos();
        }catch (error) {
            toast.error("Error al intentar agregar periodo!");
        }

    }

      // manejo de fecha
    const handleDateChangeInicio = (date) => {
        const fecha = new Date(date);
        const año = fecha.getFullYear();
        // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        const fechaFormateada = `${año}-${mes}-${dia}`;

        onInputChange({ target: { name: "fecha_inicio", value: fechaFormateada } });
    };
    const handleDateChangeFin = (date) => {
        const fecha = new Date(date);
        const año = fecha.getFullYear();
        // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        const fechaFormateada = `${año}-${mes}-${dia}`;

        onInputChange({ target: { name: "fecha_fin", value: fechaFormateada } });
    };


    return (
        <>
            {/* button add  */}
            <button className='flex items-center w-fit m-auto p-2 bg-primary text-white rounded-lg group active:scale-95 hover:scale-105 active:rounded-r-lg mb-12'  onClick={() => { setOpenModal(true) }}>
                <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="ms-3 font-bold">Agregar periodo escolar</span>
            </button>

            <Modal show={openModal} size="sm" className="bg-primary" popup>
                <Modal.Header />
                <Modal.Body >
                    <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Agregar periodo escolar</h3>
                    {/* form */}
                    <form className="min-h-[450px] flex flex-col justify-evenly" onSubmit={onSubmit}>
                        {/* div fechas */}
                        
                            {/* fecha inicio */}
                            <div className="mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="fecha_inicio" value="Fecha inicio" />
                                </div>
                                {/* todo: manejar onChange */}
                                <Datepicker id="fecha_inicio" name="fecha_inicio" onSelectedDateChanged={handleDateChangeInicio} language="es-MX" labelTodayButton="Hoy" icon="" labelClearButton="Limpiar"  required addon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>}/>
                            </div>
                            {/* fecha fin */}
                            <div className="mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="fecha_fin" value="Fecha fin" />
                            </div>
                            {/* todo: manejar onChange */}
                            <Datepicker id="fecha_fin" name="fecha_fin" onSelectedDateChanged={handleDateChangeFin} language="es-MX" labelTodayButton="Hoy" icon="" labelClearButton="Limpiar"  required addon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>}/>
                        </div>
                        
                        {/* numero */}
                        <div className="mb-6">
                            <div className="mb-2 block">
                            <Label htmlFor="numero" value="Número periodo" />
                            </div>
                            <TextInput type="number" name="numero" id="numero" value={numero} onChange={onInputChange} placeholder="Ingresa el número de periodo" min={1} max={12} required addon="#"/>
                        </div>
                        {/* nombre */}
                        <div className="mb-6">
                            <div className="mb-2 block">
                            <Label htmlFor="nombre_tipo" value="Tipo" />
                            </div>
                            <TextInput name="nombre_tipo" id="nombre_tipo" value={nombre_tipo} onChange={onInputChange} placeholder="Ingresa el tipo de periodo" maxLength={20} required addon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>}/>
                        </div>
                        {/* buttons */}
                        <div className="w-full mx-auto mt-12 flex justify-around">
                            <Tooltip content="Cancelar y cerrar" placement="bottom" style="dark">
                                <Button color="" className="hover:scale-105 active:scale-95 px-2  text-white inline-block bg-red-600 hover:bg-red-800 font-bold" onClick={() => { setOpenModal(false) }}>Cancelar</Button>
                            </Tooltip>
                            <Tooltip content="Agregar periodo y cerrar" placement="bottom" style="dark">
                                <Button type="submit" className="hover:scale-105 active:scale-95 px-2 inline-block bg-sky-600 font-bold">Agregar</Button>
                            </Tooltip>
                        </div>
                    </form>
                    </div>
                </Modal.Body>
            </Modal>

            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    )
}

export default AgregarPeriodo

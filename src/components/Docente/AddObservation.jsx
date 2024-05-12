import { Popover } from "flowbite-react";
import { useFetch } from "../../hooks";
import { useState } from "react"
import { FormObservartion } from "./";
import Loader from "../commons/Loader/Loader";


const AddObservation = ({num_control, id_asignatura}) => {
    // estado para manejar abertura de Popover
    const [open, setOpen] = useState(false);

    // estado para hacer fetching de seguimeinto del estudiante
    const {data: seguimiento, isLoading, getFetch: refetchSeguimiento} = useFetch(`seguimiento/${num_control}/${id_asignatura}`);

    return (
        <Popover aria-labelledby="area-popover" open={open} onOpenChange={setOpen} placement="top" className="shadow-2xl bg-slate-100 rounded-lg pb-4"
            content={
                <div className="w-96">
                    <h2 id="area-popover" className="text-base text-primary pt-4 px-2 font-bold">Seguimiento - {num_control}</h2>
                    {isLoading && < Loader /> || <FormObservartion existe={seguimiento.length > 0} num_control={num_control} id_asignatura={id_asignatura}  {...seguimiento[0]} setOpen={setOpen} refetchSeguimiento={refetchSeguimiento}/>}
                </div>
            }
        >
            {/* button archive */}
            <div>
                <button className="hover:scale-110 active:scale-95 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </button>
            </div> 
        </Popover>
    )
}

export default AddObservation

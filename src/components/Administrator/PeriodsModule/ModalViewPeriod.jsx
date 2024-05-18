import { Modal, Tooltip } from "flowbite-react";
import { useState} from "react";
import { useFetch } from "../../../hooks";
import { Loader } from "../../commons";
import {UpdatePeriod} from "../";
import CustomButton from "../../commons/buttons/CustomButton";


const FetchPeriod = ({id, setOpenModal}) => { 
    const {data: period, isLoading: isLoadingPeriod } = useFetch(`getPeriodo/${id}`);

    return (
        <>
            {isLoadingPeriod && < Loader /> || 
            < UpdatePeriod {...period} setOpenModal={setOpenModal} /> }
        </>
    );
};

const ModalViewPeriod = ({id}) => {
    // estado de modal
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            {/* button view */}
            <Tooltip content="Ver detalles de periodo" placement="left" style="light">
                <button className="hover:scale-1" onClick={() => { setOpenModal(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7 hover:scale-110 active:scale-95 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                </button>
            </Tooltip>

            <Modal show={openModal} size="sm" className="bg-primary" popup>
                <Modal.Header />
                <Modal.Body >
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">Detalles periodo escolar - {id}</h3>
                        < FetchPeriod id={id} setOpenModal={setOpenModal} />

                        {/* buttons */}
                        <div className="w-6/12 mx-auto mt-4 flex justify-center">
                            < CustomButton className="bg-red-600 hover:bg-red-800" tooltip="Cancelar y cerrar" placement="left" mesagge="Cancelar" accessKey='x' callback={() => { setOpenModal(false) }} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default ModalViewPeriod

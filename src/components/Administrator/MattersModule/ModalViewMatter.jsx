import { Modal, Button, Popover } from "flowbite-react";
import { useFetch } from "../../../hooks";
import { useState } from "react";
import { Loader } from "../../commons";
import UpdateMatter from "./UpdateMatter";
import UpdateAsignacionDocentes from "./UpdateAsignacionDocentes";

const FetchMatterInfo = ({ option, id, setOpenModal }) => {

  const getEndpoint = () => (option == 'detalles') ?  'getAsignatura/' : 'asignaturadocentegrupo/';

  const endpoint = getEndpoint() + id;

  // fetching a endpoint para obtener informacion del asignatura
  const { data: asignatura, isLoading } = useFetch(endpoint);

  return (
    <>
      {(isLoading && <Loader />) || (
        option == 'detalles' ? <UpdateMatter asignatura={asignatura} setOpenModal={setOpenModal}/> : < UpdateAsignacionDocentes asignaturaDatetails={asignatura} setOpenModal={setOpenModal}/>
      )}
    </>
  );
};

const ModalViewMatter = ({id}) => {
  // estado de modal
  const [openModal, setOpenModal] = useState(false);

  const [option, setOption] = useState('');

  return (
    <>
      {/* button view */}
      <Popover content={
            <>
              <button className="px-3 py-2 flex gap-2 hover:bg-yellow-200 text-primary w-full" onClick={() => {setOption('detalles'); setOpenModal(true);}}>
                <svg className="w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Detalles de asignatura
              </button>
              <button className="px-3 py-2 flex gap-2 hover:bg-yellow-200 text-primary w-full" onClick={() => {setOption('detalles_docente'); setOpenModal(true);}}>
                <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                Detalles asignatura - docentes - grupos
              </button>
            </>
            } placement='left' trigger="hover">

        <button className="hover:scale-1" >
        <svg className="w-7 h-7 transition duration-75 hover:scale-105 hover:text-yellow-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
        </svg>
        </button>
      </Popover>
      {/* modal edit*/}
      <Modal show={openModal} size="xl" className="bg-primary" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Información asignatura - {id}
            </h3>

            <FetchMatterInfo option={option} id={id} setOpenModal={setOpenModal}/>

            {/* buttons */}
            <div className="w-6/12 mx-auto mt-4 flex">
              <Button color={""} className="active:scale-95 text-white px-2  inline-block bg-red-600 hover:bg-red-800 mx-auto font-bold" onClick={() => { setOpenModal(false);}}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalViewMatter;

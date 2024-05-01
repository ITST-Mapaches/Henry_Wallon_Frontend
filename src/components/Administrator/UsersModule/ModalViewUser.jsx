import { Button, Modal, Tooltip } from "flowbite-react";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../commons/Loader/Loader";
import UpdateUser from "./UpdateUser";

const FetchUser = ({ id, inputRole, rol, setOpenModal }) => {
  // fetching a endpoint para obtener informacion del usuario
  const { data: user, isLoading } = useFetch(`getUsuario/${id}`);

  return (
    <>
      {/* evalua si se muestra el loader o el componente para actualizar */}
      {(isLoading && <Loader />) || (
        <UpdateUser
          user={user}
          inputRole={inputRole}
          rol={rol}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const ModalViewUser = ({ id, rol }) => {
  const [inputRole, setInputRole] = useState({ Alumno: false, Docente: false });

  // efecto secundario al cambiar el valor del rol
  useEffect(() => {
    if (!!rol) {
      setInputRole((prevInputRole) => ({
        ...prevInputRole,
        Alumno: rol === "Alumno" ? !prevInputRole.Alumno : false,
        Docente: rol === "Docente" ? !prevInputRole.Docente : false,
      }));
    }
  }, [rol]);

  // estado de modal
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* button view */}
      <Tooltip content="Ver detalles de usuario" placement="left" style="light">
        <button
          className="hover:scale-1"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-7 h-7 hover:scale-110 active:scale-95 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </Tooltip>
      {/* modal edit*/}
      <Modal show={openModal} size="4xl" className="bg-primary" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Información usuario - {id}
            </h3>

            <FetchUser
              id={id}
              inputRole={inputRole}
              rol={rol}
              setOpenModal={setOpenModal}
            />

            {/* buttons */}
            <div className="w-6/12 mx-auto mt-4 flex">
              {/* <Button type="submit" className="active:scale-95 inline-block bg-sky-600 mx-auto font-bold">Agregar</Button> */}
              <Button
                color={""}
                className="active:scale-95 text-white px-2  inline-block bg-red-600 hover:bg-red-800 mx-auto font-bold"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalViewUser;

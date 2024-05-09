import { Button, Modal, Tooltip } from "flowbite-react";
import { useState, useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { UsersContext } from "../../../context/UsersContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { useDelete } from "../../../hooks";

const ModalEliminar = ({ id, name }) => {
  // estado para mostrar modal
  const [openModal, setOpenModal] = useState(false);

  // uso de contexto, desestructurando funcion para cargar usuarios
  const { getFetch: loadUsers } = useContext(UsersContext);

  const eliminar = async (id) => {
    try {
      await useDelete("deleteUser/" + id);
      toast.success("Usuario eliminado!");
      loadUsers();
    } catch (error) {
      console.log(error)
      toast.error("Error al intentar eliminar usuario!");
    }
  };

  return (
    <>
      <Tooltip content="Eliminar usuario" placement="right" style="light">
        <button className="hover:scale-1" onClick={() => {setOpenModal(true)}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7 hover:scale-105 active:scale-95 text-rose-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
          </svg>
        </button>
      </Tooltip>
      <Modal className="bg-black" show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
            <h3 className="mb-5 text-lg font-bold text-primary">
              ¿Estás seguro de que quieres eliminar el usuario?
              <br />
              <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
                <span class="relative text-white"> {id + ": " + name}</span>
              </span>
            </h3>
            <div className="flex justify-center gap-4"> 
              <Button color="" className="bg-red-600 font-semibold text-white hover:scale-105 active:scale-95 hover:bg-red-700"
                onClick={() => {
                  setOpenModal(false);
                  eliminar(id);
                }}
              >
                Sí, estoy seguro
              </Button>
              <Button color="" className="bg-sky-600 font-semibold text-white hover:scale-105 active:scale-95 hover:bg-sky-700" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default ModalEliminar;

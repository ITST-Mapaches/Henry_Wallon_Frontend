import ModalEliminar from "./ModalEliminar";
import ModalViewUser from "./ModalViewUser";

const TableRowUser = ({ id, name, username, activo, sexo, rol }) => {
  //objeto para determinar el color del fondo segun el rol
  const background = {
    Docente: "bg-indigo-500",
    Alumno: "bg-green-500",
    Tutor: "bg-red-500",
    Administrador: "bg-pink-500",
  };

  return (
    <>
      <tr className="bg-primary">
        <td className="p-4 rounded-s-2xl text-left">
          <div className="flex align-items-center">
            <span className="rounded-full h-12 w-12 shadow-sm shadow-white text-primary bg-white flex items-center justify-center font-bold text-lg">
              {id}
            </span>
            <div className="ml-3">
              <div className="">{name}</div>
              <div className="text-gray-400">@{username}</div>
            </div>
          </div>
        </td>
        <td className="p-4 h-full flex items-center justify-start">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping  absolute inline-flex h-full w-full rounded-full opacity-75 ${
                activo == 1 ? "bg-lime-300" : "bg-rose-500"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                activo == 1 ? "bg-lime-300" : "bg-rose-500"
              }`}
            ></span>
          </span>
          <br />
          <br />
          <span className="px-2">{(activo && "Activa") || "Suspendida"}</span>
        </td>
        <td className="p-4">
          <span className="px-2">{sexo}</span>
        </td>
        <td className="p-4">
          <span
            className={`${background[rol]} text-gray-50 rounded-md px-2 font-semibold`}
          >
            {rol}
          </span>
        </td>
        <td className="p-4 rounded-r-2xl">
          <div className="flex gap-4 items-center">
            <ModalViewUser id={id} rol={rol} />
            <ModalEliminar id={id} name={name} />
          </div>
        </td>
      </tr>
      <tr className="h-4"></tr>
    </>
  );
};

export default TableRowUser;

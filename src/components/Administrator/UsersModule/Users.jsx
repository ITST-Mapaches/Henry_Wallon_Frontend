import { useContext } from "react";
import { UsersContext } from "../../../context/UsersContextProvider";
import { TableRowUser, AgregarUser } from "..";
import { Loader, Vacio } from "../../commons";

const Users = () => {
  //uso de contexto para acceder a usuarios
  const { data: users, isLoading: isLoadingUsers } = useContext(UsersContext);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg  mt-14">
        <AgregarUser />
        {/* Todo: mostrar componente de vacio cuando users sea nulo */}
        {isLoadingUsers 
        ? (<Loader />) 
        : users.length > 0 ? (
          <table className="m-auto text-center text-white animate-jump-in">
            <thead className="after:content-[''] after:block after:h-4">
              <tr className="bg-[#21182F]">
                <th className="p-4 rounded-s-2xl">Usuario</th>
                <th className="p-4">Estatus cuenta</th>
                <th className="p-4">Sexo</th>
                <th className="p-4">Rol</th>
                <th className="p-4 rounded-r-2xl">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-normal">
              {users.map((user) => (
                <TableRowUser key={user.id} {...user} />
              ))}
            </tbody>
          </table>
        ) : (
          <Vacio />
        )}
      </div>
    </div>
  );
};

export default Users;

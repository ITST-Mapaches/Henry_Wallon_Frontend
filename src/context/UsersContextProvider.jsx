import {UsersContext} from "./UsersContext";
import { useUsers } from "../hooks/useUsers";

const UsersContextProvider = ({ children }) => {
  return (
    < UsersContext.Provider value={useUsers()} >
        {children}
    </ UsersContext.Provider >
  );
};

export default UsersContextProvider;

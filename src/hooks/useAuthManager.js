import { useEffect, useState } from "react";

export const useAuthManager = () => { 

    //funcion para inicializar el usuario a partir del localstorage si no existe es null y si existe entonces lo parseamos
    const searchUser = () => (!localStorage.getItem('user')) ? null : JSON.parse(localStorage.getItem('user'));
    
    //estado para el usuario
    const [user, setUser] = useState (searchUser());

    //efecto secundario cuando se modifica user si no tiene un valor válido elimina el storage
    useEffect( () => { 
        if(!user){
            localStorage.removeItem('user') 
        }else{
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return{
        ...user,
        user,
        setUser
    }
} ;

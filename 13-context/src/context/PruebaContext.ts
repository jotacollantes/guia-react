import {createContext} from 'react';

export interface Usuario {
    nombre:string, 
    proyecto:string,
    username:string,
    islogged:boolean 
}
export interface ContextProps{
    usuario: Usuario |{},
    setUsuario:React.Dispatch<React.SetStateAction<{
        nombre: string;
        proyecto: string;
        username: string;
        islogged:boolean
    }>>
}
//*Creamos el contexto 
export const PruebaContext=createContext<ContextProps>({} as ContextProps) 
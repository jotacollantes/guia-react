import { useContext } from "react"
import { PublicationContext } from '../context/publication/PublicationContext';

//Creamos este custom hook para poder usar el Publication Context
export const usePublication=()=>{
    return useContext(PublicationContext)
}
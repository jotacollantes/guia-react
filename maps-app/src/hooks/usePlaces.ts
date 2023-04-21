import { useContext } from "react"
import { PlacesContext } from '../context';

//Creamos este custom hook para poder usar el Places Context
export const usePlaces=()=>{
    return useContext(PlacesContext)
}
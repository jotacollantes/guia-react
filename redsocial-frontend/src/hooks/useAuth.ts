import { useContext } from "react"
import { AuthContext } from '../context/AuthProvider';

//Creamos este custom hook para poder usar el Auth context
export const useAuth=()=>{
    return useContext(AuthContext)
}
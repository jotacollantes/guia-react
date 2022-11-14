import { useState } from "react"


    //!Forma con funcion tradicional tradicional
    //!export function useForm<T>(initState:T)

    //!El tipo de dato que va a manejar el custom hook es un generico lo que significa que va a manejar el tipo de dato de la variable, del objeto o del arreglo configurado en el initialState dentro del componente que esta invocando al custom hook  
    export const useForm =<T extends object >(initState:T) =>{
    const [formulario, setFormulario] = useState(initState)
        const handlerEvent=({target}: React.ChangeEvent<HTMLInputElement>)=>{
            const {name,value}=target
           
            setFormulario((prev:any)=>{
                return {
                    ...prev,//Propago el estado
                    [name]:value//Sobreescribo la propiedad que esta cambiando
                }
            })
        }

        return {
            formulario,
            handlerEvent,
            ...formulario
        }
}
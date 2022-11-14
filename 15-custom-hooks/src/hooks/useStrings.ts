import { SetStateAction, useState } from "react"

 //!El tipo de dato que va a manejar el custom hook es un generico lo que significa que va a manejar el tipo de dato de la variable, del objeto o del arreglo configurado en el initialState dentro del componente que esta invocando al custom hook 
export const useStrings=<T extends string >(cadena:T)=>{
    

    //!Al useState le tambien le tengo que decir el tipo de dato que va a manejar
    const [stateStrings, setStateStrings] = useState<string>(cadena)
    
    const upperCase =()=>{
        setStateStrings(stateStrings.toUpperCase())
    }
      
    const lowerCase =()=>{
        setStateStrings(stateStrings.toLowerCase())
    }

    const concat  =(arg:string)=>{
        setStateStrings(`${stateStrings}-${arg}`)
    }
    const reset  =()=>{
        setStateStrings(cadena)
    }

    return {
        stateStrings,
         upperCase,
        lowerCase,
        concat,
        reset
    }


}
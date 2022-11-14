import { useState } from "react";


    //!El tipo de dato que va a manejar el custom hook es un generico lo que significa que va a manejar el tipo de dato de la variable, del objeto o del arreglo configurado en el initialState dentro del componente que esta invocando al custom hook  
export const useForms = <T extends object>(curso:T) => {

    const [cursoState, setCursoState] = useState(curso)
    
    const handlerChange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>)=>{
        //console.log(e.target.name)
        let {name,value} =e.target
        setCursoState({...cursoState,
        [name]:value
        })
        const box = document.querySelector('#box') as HTMLDivElement | null
         if  (box) {
            box.innerText="enviado"
        }
       
          

    }


    return {
        ...cursoState,
        cursoState,
        handlerChange
    }
}

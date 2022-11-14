import React, { useReducer } from 'react'

const initialState ={
    contador:10
    //Pueden haber mas propiedades
}
type ActionType =
|{type:"incrementar"}
|{type:"decrementar"}
|{type:"custom",payload:number}

const contadorReducer=(state: typeof initialState,action:ActionType)=>{
    // El reducer siempre va a retornar un nuevo estado estado

    switch (action.type) {
        case "incrementar":
            return {
                //Devolvemos un nuevo objeto rompiendo la referencia y actualizamos y sobreescribimos la propiedad contador
                ...state,
                contador: state.contador +1
            }
            break;
        case "decrementar":
            return {
                    //Devolvemos un nuevo objeto rompiendo la referencia y actualizamos y sobreescribimos la propiedad contador
                    ...state,
                    contador: state.contador -1
                }
            break;
        case "custom":
                return {
                    ...state,
                    //!El payload lo tengo en el objeto action que es del tipo ActionType. para este caso el objeto de tipo ActionType me llega con 2 propiedades el action.type y el action.payload
                    contador: action.payload
                    }
                break;
    
        default:
            return state;
    }
   
}

export default function ContadorRed() {
    const [contadorState, dispatch] = useReducer(contadorReducer, initialState)
  return (
    <>
    {/* contadorState es de tipo objeto que tiene la propiedad contador */}
    <h2>Contador: {contadorState.contador}</h2>
    <button className="btn btn-outline-primary"
    //! envio como parametro en el metodo dispatch el objeto de tipo ActionType
    onClick={()=>{dispatch({type:"incrementar"})}}
    > Incrementar + 1
    </button>
    <button className="btn btn-outline-secondary"
    //! envio como parametro en el metodo dispatch el objeto de tipo ActionType
    onClick={()=>{dispatch({type:"decrementar"})}}
    > Decrememtar -1
    </button>
    <button className="btn btn-outline-danger"
    //! envio como parametro en el metodo dispatch el objeto de tipo ActionType
    onClick={()=>{dispatch({type:"custom",payload:100})}}
    > setear a 100
    </button>
    </>
  )
}

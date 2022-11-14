import { useState } from "react"
import { useApiCall } from "../hooks/useApiCall"

export const MiUsuario = () => {


    const initValue='https://reqres.in/api/users/1'
    
    const [url, setUrl] = useState(initValue)
    const {isLoading,datosApi}=useApiCall(url)
    
    
    const handlerChange=(e:React.ChangeEvent<HTMLInputElement>)=> {

        //setUsuario('')
        //setIsLoading(true)
        const id=parseInt(e.target.value)
        setUrl(`https://reqres.in/api/users/${id}`)
        // setTimeout(() => {
        //      obtieneUsuario(id)
             
        // }, 3000);
    }


    
  return (
    <div>
        <h1>MiUsuario</h1>
        <pre>
        {
            (isLoading) ?'Cargando... ': ''
        }
        </pre>
        <pre>
        {
             (datosApi) ? JSON.stringify(datosApi): ''
        }
        </pre>
        
        <input type="number" name="id" onChange={handlerChange}/>
    </div>
  )
}

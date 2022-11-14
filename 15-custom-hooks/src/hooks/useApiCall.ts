import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const useApiCall = (url:string) => {

  
  const [datosApi, setDatosApi] = useState<{}|''>() //Para poder manejar el el texto que estoy presentando en el JSON.stringify manejo dos tipos de datos en el estado o un objeto vacio o un string vacio
  const [isLoading, setIsLoading] = useState(false)


  const obtieneDatosApi=() =>
    {


      setTimeout(async () => {
        try {
        
        const {data}= await axios.get(url)
        //console.log(data)
        setIsLoading(false)
        setDatosApi(data)
        } catch (error) {
            console.log(error)
        }
      }, 3000);
    }

    useEffect(() => {
        
          if(url===''){
            return;
          };
           
          setDatosApi('')
          setIsLoading(true)
          obtieneDatosApi()
          
      }, [url])


      
   
  return {
        ...datosApi,
        datosApi,
        isLoading
  }
}

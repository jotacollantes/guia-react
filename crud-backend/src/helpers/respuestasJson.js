import { response } from 'express'
export const respuestasJson={}
//Añadimos un metodo al objeto
respuestasJson.mensajes=(res=response,statusCode,ok,mensaje,data="")=>{
    return res.status(statusCode).json(
        {
            ok,
            mensaje,
            data
        }
        )
}
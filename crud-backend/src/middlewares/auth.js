import { User } from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import { request, response } from 'express'
import { respuestasJson } from "../helpers/respuestasJson.js";
const {mensajes}=respuestasJson

export const verificarToken=(req=request,res=response,next)=>{
    console.log(req.headers)

    if(!req.headers.authorization)
    {
        return mensajes(res,401,false,"No estas autorizado a este recurso 1")
    }

    const token=req.headers.authorization.split(" ")[1]
    if(!token){
        return mensajes(res,401,false,"No estas autorizado a este recurso 2")
    }

    jwt.verify(token,"secreta",async (err,payload)=>{
        if(err){
            return mensajes(res,401,false,"No estas autorizado a este recurso 3")
        }

        const {_id}=payload

        const resp = await User.findById(_id)
        if(!resp){
            return mensajes(res,401,false,"No estas autorizado a este recurso 4")
        }
        //!Guardamos el id del Jefe en el request.userid para que sea ausado en toda la conexion a la api.
        req.userid=_id
        console.log(req.userid)
        next();
    })
}
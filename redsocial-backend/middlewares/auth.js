//Importar modulos
import jwt from 'jwt-simple'
import moment from 'moment'
import { request, response } from 'express'


//Funcion de autenticacion

export const verifyToken=(req=request,res=response,next)=>{

//Importar clave secreta
const secret= process.env.JWT_SECRET_KEY
//Comporbar si me llega una cabecera auth

if(!req.headers.authorization){
    return res.status(403).json({
        ok:false,
        message:'el header no incluye el token'
    })
}

//decodificar token
//limpiamos el tken quitando ' o " que pueda venir en el header
const token=req.headers.authorization.replace(/['"]+/g,'')

try {
    const payload= jwt.decode(token,secret)
    //COmprobar lar expiracion del token

    if(payload.exp <= moment().unix()){
        return res.status(401).json({
            ok:false,
            message:'token vencido'
        })
    }
    //*Agregar datos a la request
    req.user=payload
} catch (error) {
    return res.status(404).json({
        ok:false,
        message:'token invalido'
    })
}



//Pasar a la ejecucion del controlador
next()
}


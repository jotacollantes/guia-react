import {request,response} from 'express'
import {Publication} from '../models/publication.js'

export const publicationCtrl={}


publicationCtrl.Prueba =(req=request,res=response)=>{
    return res.status(200).send({
        message:"enviado desde el controlador publication"
    })
}


//Guardar publicacion

//Sacar una publicacion

//Eliminar publicaciones

//Listar todas las publicaciones

//Listar publicaciones de un usuario

//Subir ficheros

//Devolver archivos multimedia/imagenes
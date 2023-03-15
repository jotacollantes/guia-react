import { request, response } from 'express'
import fs from 'fs'
import path from 'path'
import mongoosePagination from 'mongoose-pagination'
import { Publication } from '../models/publication.js'
import {followUserIds} from '../helpers/followServices.js'

export const publicationCtrl = {}


publicationCtrl.Prueba = (req = request, res = response) => {
    return res.status(200).json({
        message: "enviado desde el controlador publication"
    })
}


//Guardar publicacion
publicationCtrl.Save = async (req = request, res = response) => {

    try {
        //Recoger datos del body
        const data = req.body
        //console.log({data})

        // Validar si se envian datos
        if (!data.text) {
            return res.status(401).json({
                status: "error",
                message: "Dato de la publicacion es necesario"
            })
        }

        //Crear y llenar el objeto del modelo
        const newPublication = new Publication(data)
        //*Añadimos el id del usuario conectado a la propìedad user del modelo Publication instanciado en newPublication
        newPublication.user = req.user.id
        //Guardar objeto en la BD
        await newPublication.save()
        //Devolver respuesta.
        //console.log(newPublication)
        return res.status(200).json({
            status: "success",
            message: newPublication
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al grabar publicacion",
            
        })
    }

}

//Sacar una publicacion
publicationCtrl.Advertise = async (req = request, res = response) => {
    try {
        //Sacar id de de la piblicacion de los params
        const publicationId = req.params.id
        //Find de la publicacion con el id

        const publication = await Publication.findById(publicationId, 'text created_at')

        //console.log(publication)

        //Devolver la publicacion
        if (!publication) {
            return res.status(404).json({
                status: "error",
                message: "publication not exist"
            })
        }


        return res.status(200).json({
            status: "success",
            publication: publication

        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al consultar publicacion"
        })
    }

}

//Eliminar publicaciones

publicationCtrl.Delete = async (req = request, res = response) => {
    let publicationId
    try {
        
        publicationId = req.params.id
        const userId= req.user.id
        const publicationDeleted = await Publication.findOneAndDelete({'_id':publicationId, 'user':userId})
        //console.log(publicationDeleted)

        if (!publicationDeleted) {
            return res.status(404).json({
                status: "error",
                message: "Publicacion no existe"
            })
        }


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar publicacion"
        })
    }
    return res.status(200).json({
        status: "success",
        message: "Publicacion ha sido eliminada",
        publication: publicationId
    })
}
//Listar publicaciones de un usuario
publicationCtrl.AdvertiseUser = async(req = request, res = response) => {
    //Obtener id del user enviado en la url
    try {
        const userId=req.params.id
    let page=1

    if(req.params.page) page=+req.params.page

    //controlar la pagina
    const itemsPerPage=5
    
    //Find,populate,ordernar y paginar
    const publicationsByUser=await Publication.find({user:userId})
    //Ordernar de forma descendente
    .sort({created_at:'desc'})
    .populate('user','-password -__v -role -email')
    .paginate(page,itemsPerPage)
    

    if (!publicationsByUser || publicationsByUser.length === 0) {
        // Entra por array vacio
        
        return res.status(404).json({
            status: "error",
            messages: "No hay publicaciones que pertenecen al usuario ",
            

        })
    }
    //Obtenemos el total de usariosseguidos
    const totalpublicationsByUser = await Publication.count({'user':userId})
    
    return res.status(200).json({
        status:"success",
        message: "enviado desde el controlador AdvertiseUser",
        page,
        pages:Math.ceil(totalpublicationsByUser/itemsPerPage),
        total:totalpublicationsByUser,
        publicationsByUser,
        
    })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al mostrar las publicaciones del usuario ingresado",
            error
        })
    }
    
}
//Subir ficheros

publicationCtrl.Upload = async (req = request, res = response) => {
    //Obtener el id de la publicacion

    const publicationId=req.params.id
    //Recoger el fichero de imagen y comporbar que existe
    if (!req.file) {
        return res.status(404).json({
            status: "error",
            message: "Peticion no incluye la imagen",
        })
    }

    //Conseguir el nombre del archivo
    const imageName = req.file.originalname
    //Sacar la extension del archivo
    const imageSplit = imageName.split('.')
    const fileExtention = imageSplit[imageSplit.length - 1]

    //Comprobar extension
    const validateExtentios = ['png', 'jpg', 'jpeg', 'gif']
    if (!validateExtentios.includes(fileExtention)) {
        //Si no es la extension correcta, borrar archivo
        const filePath = req.file.path
        fs.unlinkSync(filePath)

        return res.status(404).json({
            status: "error",
            message: "Extension de archivo no valida",
        })
    }


    //Si es la extension correcta, guardar la imagen.
    //* la propiedad filename es el nombre configurado en multer.diskStorage()

    try {
        //Busco y actualiza la publicacion del usuario conectado
        const userUpdated = await Publication.findOneAndUpdate({_id:publicationId,user:req.user.id}, { file: req.file.filename }, { new: true })
        //Devolver respuesta

        return res.status(200).json({
            status: "success",
            user: userUpdated,
            file: req.file
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar la imagen del usuario",
        })
    }
}

//Devolver archivos multimedia/imagenes
publicationCtrl.Media = (req = request, res = response) => {
    //Sacar el parametro de la url
    const file = req.params.file

    //Montar el path real
    const filePath = `./uploads/publications/${file}`

    //Comprobar el archivo existe

    fs.stat(filePath, (error, stats) => {


        if (!stats) {
            return res.status(404).json({
                status: "error",
                message: "Archivo no existe",
            })
        }
    })

    
    // return res.status(200).json({
    //     message: "enviado desde el controlador avatar",
    //     user: req.user
    // })

    //Devolver el file
    // Con path.resolve(filePath) obtengo la ruta absoluta para poder localizar el archivo /Users/jota/Sites/master-react/redsocial-backend/uploads/avatars/avatar-1678682273685-nest-js.png
    
    return res.sendFile(path.resolve(filePath))
}
//Listar todas las publicaciones(feed)
publicationCtrl.Feed = async(req = request, res = response) => {

    try {
        //Sacar la pagina actual
      let page=1
      if(req.params.page) page=req.params.page

      //Establecer numero de elementos por pagina
      const itemsPerPage=5

      // Sacar un array de identificadores de usuarios que yo estoy siguiendo como usuario logeado.

      const myFollows=await followUserIds(req.user.id)

      //FInd a publicaciones operador in, ordenar,popular,paginar 

      //*COn este find busco las publicaciones de los usarios que sigo y que estan en el arreglo myFollows.following
    const publications=await Publication.find({user:{$in:myFollows.following}})
    .populate('user','-password -email -__v -role')
    .sort({created_at:'desc'})
    .paginate(page,itemsPerPage)
     //*esta manera tambien sirve: await Publication.find({user:myFollows.following})
     //console.log(publications)

     const totalPublications=await Publication.find({user:{$in:myFollows.following}}).count()
    return res.status(200).json({
        status:'success',
        message: "enviado desde el controlador Feed",
        page,
        totalPublications,
        pages:Math.ceil(totalPublications/itemsPerPage),
        following:myFollows.following,
        publications
    })
    } catch (error) {
        //console.log(error)
        return res.status(500).json({
            status:'error',
            message: "Error al cargar el Feed",
            
        })
    }
      
}
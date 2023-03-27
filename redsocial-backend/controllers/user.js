import { request, response } from 'express'
import { User,Follow, Publication } from '../models/index.js'
import bcrypt from 'bcrypt'
import { createJwt } from '../helpers/jwt.js'
import mongoosePagination from 'mongoose-pagination'
import fs from 'fs'
import path from 'path'
import { utils } from '../helpers/utils.js'
import {followUserIds,followThisUser} from '../helpers/followServices.js'
export const userCtrl = {}

userCtrl.Prueba = (req = request, res = response) => {
    return res.status(200).json({
        message: "enviado desde el controlador user",
        user: req.user
    })
}


userCtrl.Registro = async (req = request, res = response) => {

    try {

        //Recoger datos de la request
        const { name, surname, nick, email, password, bio } = req.body
        //console.log({ name, surname, nick, email, password })
        // Validacion de que llegan bien

        //if (name && nick && email && password )
        if (!name || !nick || !email || !password) {
            return res.status(400).json({

                ok: false,
                message: "Datos incompletos"
            })
        }
        //console.log('registro Valido')

        //Creamos objeto de usuario
        //*Creamos una instancia de User, enviamos como argumento un {} con los campos {name,surname,nick,email,password}
        let userToSave = new User({ name, surname, nick, email, password, bio })

        const usuarioExiste = await utils.UsuarioExiste(userToSave.email, userToSave.nick)

        if (usuarioExiste) {
            return res.status(400).json({
                ok: false,
                message: "Usuario existe"
            })

        }
        // Cifrar contraseña
        userToSave.password = await utils.Hash(userToSave.password)


        //Guardar resultados
        await userToSave.save()
        //console.log(userStore)
        //Devolver datos
        return res.status(200).json({


            ok: true,
            userToSave
        })


    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error
        })
    }
}

userCtrl.Login = async (req = request, res = response) => {
    //Recoger Parametros
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({

            ok: false,
            message: "Datos incompletos"
        })
    }

    //Buscar en BD si existe, si no existe findOne Devuelve null
    const userExiste = await User.findOne({ email: email.toLowerCase() })
    //.select({"password":false,"create_at":false})
    //console.log(userExiste)
    if (!userExiste) {
        return res.status(404).json({
            ok: false,
            message: "usuario no existe"
        })
    }

    //Comprobar Contraseña, userExiste.password tiene la contraseña encriptada
    const pwd = bcrypt.compareSync(password, userExiste.password)
    //console.log(pwd)
    if (!pwd) {
        return res.status(401).json({
            ok: false,
            message: "Contraseña invalida"
        })
    }
    const secret = process.env.JWT_SECRET_KEY

    //generar Token
    const token = createJwt(userExiste)

    return res.status(200).json({
        status: "success",
        message: "enviado desde el metodo Login",
        user: {
            id: userExiste.id,
            name: userExiste.name,
            nick: userExiste.nick,
        },
        token

    })
}

userCtrl.Profile = async (req = request, res = response) => {
    const id = req.params.id
    //console.log(id)
    const userProfile = await User.findById(id).select({ password: 0, role: 0 })
    //console.log(user)

    if (!userProfile) {

        return res.status(404).json({
            ok: "false",
            message: `Usario con el id ${id} no encontrad`,

        })
    }
    //Imformacion de seguimiento

    const followInfo=await followThisUser(req.user.id,id)

    return res.status(200).json({
        status: "success",
        userProfile,
        following:followInfo.following,
        follower:followInfo.follower
    })

}

userCtrl.List = async (req = request, res = response) => {
    //Pagina default
    let page = 1
    if (req.params.page) page = +req.params.page

    const itemsPerPage = 5
    //Devuelve un array
    const listUsers = await User.find()
        .select('-email -__v -role -password')
        .sort('_id')
        .paginate(page, itemsPerPage)


    if (!listUsers || listUsers.length === 0) {
        // Entra por array vacio
        //console.log({listUsers})
        return res.status(404).json({
            status: "error",
            messgae: "No hay usuarios disponibles"

        })
    }

 //Sacar un array de los ids de los usuarios que me siguen y los que sigo como usuario conectado

 let followUserIdsList=await followUserIds(req.user.id) 

    //Obtenemos el total de usarios registrados 
    const total = await User.count()
    return res.status(200).json({
        status: "success",
        listUsers,
        page,
        itemsPerPage,
        total,
        //Ceil 3,2 redondea a su siguiente entero o sea 4
        pages: Math.ceil(total / itemsPerPage),
        following:followUserIdsList.following,
        followme:followUserIdsList.followers
    })
}

userCtrl.Update = async (req = request, res = response) => {

    try {
        //Recoger info del usuario que se encuentra en el token por medio de la req
        let userIdentity = req.user

        //Recogemos informacion del usuario que viene en el req.body
        let userToUpdate = req.body
        //console.log({userToUpdate})
        //Eliminar campos sobrantes

        delete userToUpdate.role
        delete userToUpdate.iat
        delete userToUpdate.exp
        delete userToUpdate.image

        //Comprobar si el correo o el nick ya existe en caso de que quiere modificar


        if (userIdentity.email.trim() !== userToUpdate.email.trim()) {


            const correoExiste = await utils.CorreoExiste(userToUpdate.email)

            if (correoExiste) {
                return res.status(400).json({
                    ok: false,
                    message: "correo existe y no es posible sobreescribirlo"
                })

            }
        }

        //Comprobar si el correo o el nick ya existe en caso de que quiere modificar
        if (userIdentity.nick.trim() !== userToUpdate.nick.trim()) {
            const NickExiste = await utils.NickExiste(userToUpdate.nick)

            if (NickExiste) {
                return res.status(400).json({
                    ok: false,
                    message: "Nick existe y no es posible sobreescribirlo"
                })

            }
        }
        // Cifrar contraseña en caso de que la envie para cambiarla (o sea la escribio).
        if (userToUpdate.password) {
            userToUpdate.password = await utils.Hash(userToUpdate.password)
        } else{
            //Borramos el password del objeto para no sobreescribir la clave
            delete userToUpdate.password
        }

        // Buscar y actualizar
        const updatedUser = await User.findByIdAndUpdate(userIdentity.id, userToUpdate, { new: true })

        return res.status(200).json({
            status: "success",
            user: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar los datos"
        })
    }
}

userCtrl.Upload = async (req = request, res = response) => {

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
        const userUpdated = await User.findByIdAndUpdate(req.user.id, { image: req.file.filename }, { new: true })
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

userCtrl.Avatar = (req = request, res = response) => {
    //Sacar el parametro de la url
    const file = req.params.file

    //Montar el path real
    const filePath = `./uploads/avatars/${file}`

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

userCtrl.Counter=async(req = request, res = response)=>{

    try {
    let userId=req.user.id;
    //Obtenemos el id del params en caso de que lo envie
    if(req.params.id){
        userId=req.params.id
    }
    //Usuarios que sigo
    const following=await Follow.count({user:userId})
    //Usuarios que me siguen
    const followed=await Follow.count({followed:userId})
    //Mis publicaciones.
    const publication=await Publication.count({user:userId})
    return res.status(201).json({
        status: "succes",
        userId,
        following,
        followed,
        publication
    })

    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "Error al obtenerlos contadores"
        })
    }
    
}